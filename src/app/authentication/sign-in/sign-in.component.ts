import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { NgClass, NgIf } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { jwtDecode } from 'jwt-decode';
import * as yup from 'yup';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, NgClass, ReactiveFormsModule, FormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    LoginForm: FormGroup;
    formErrors: any = {};
    alertType: 'success' | 'error' | 'warning' | null = null;
    alertmsg: string = '';

    // Toast
    toast = false;
    toggleToast() {
        this.toast = !this.toast;
    }
    toastTitle = 'Validation Error';
    toastBody = '';
    public hideAlert() {
        setTimeout(() => {
            this.toast = false;
        }, 2000);
    }

    schema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
    });

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private _service: UserService,
        private _router: Router
    ) {
        this.LoginForm = fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required]],
        });

        // live validation on change
        this.LoginForm.valueChanges.subscribe((values) => {
            this.validateForm(values);
        });
    }

    async validateForm(values: any) {
        try {
            await this.schema.validate(values, { abortEarly: false });
            this.formErrors = {};
        } catch (err: any) {
            const errors: any = {};
            if (err.inner) {
                err.inner.forEach((e: any) => {
                    errors[e.path] = e.message;
                });
            }
            this.formErrors = errors;
        }
    }

    onSubmit() {
        if (this.LoginForm.valid) {
            console.log(this.LoginForm.value);
            const usercredentials = this.LoginForm.value;
            // console.log('✅******User object******** :', user);
            this._service.Signin(usercredentials).subscribe({
                next: (res) => {
                    if (
                        res.body.isAuthenticated == true &&
                        res.body.status == false
                    ) {
                        this._router.navigate(['authentication/suspension']);
                        return;
                    }
                    if (
                        res.status === 200 &&
                        res.body.isAuthenticated == true
                    ) {
                        // debugger
                        localStorage.setItem('token', res.body.token);
                        this._service.setToken(res.body.token);
                        localStorage.setItem(
                            'email',
                            this.LoginForm.get('email')?.value
                        );
                        const decoded: any = jwtDecode(res.body.token);
                        console.log(decoded);
                        console.log('✅ Success:', res);
                        localStorage.setItem('role', decoded.roles);
                        this._router.navigate(['dashboard']);
                    } else {
                        this._router.navigate(['']);
                        this.alertType = 'warning';
                    }
                },
                error: (res) => {
                    // debugger
                    // console.log(res);
                    if (
                        res.error instanceof ProgressEvent &&
                        res.status === 0
                    ) {
                        this.alertType = 'error';
                        this.toastBody = this.alertmsg =
                            'Cannot connect to server';
                        this.toggleToast();
                        this.hideAlert();
                    }
                    if (res.status === 400) {
                        console.log(this.alertType);
                        this.alertType = 'error';
                        this.toastBody = this.alertmsg = 'Invalid Credentials';
                        this.toggleToast();
                        this.hideAlert();
                        // console.log("⚠️ Validation error:", res);
                        // console.log(this.alertType);
                    } else if (res.status === 500) {
                        // console.log(this.alertType);
                        // console.error("🔥 Server error",res);
                        this.alertType = 'error';
                        this.toastBody = this.alertmsg =
                            'Cannot connect to server';
                        this.toggleToast();
                        this.hideAlert();
                        // console.log(this.alertType);
                    } else {
                        // this._router.navigate(['authentication']);
                        this.alertType = 'error';
                        this.toastTitle = 'Error';
                        this.toastBody = this.alertmsg =
                            'Internal Server Error';
                        this.toggleToast();
                        this.hideAlert();
                    }
                },
            });
        } else {
            this.alertType = 'error';
            this.toastBody = this.alertmsg = 'Enter required Fields';
            this.toggleToast();
            this.hideAlert();
        }
    }

    // dismissAlert() {
    //     this.showAlert = false;
    // }

    // Password Show/Hide
    password: string = '';
    isPasswordVisible: boolean = false;
    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    onPasswordInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password = inputElement.value;
    }
}
