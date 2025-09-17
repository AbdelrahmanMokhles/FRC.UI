import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import * as yup from 'yup';

@Component({
    selector: 'app-forgot-password',
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgIf,
        NgClass,
    ],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
    ForgotForm: FormGroup;
    alertType: 'success' | 'error' | 'warning' | null = null;
    alertmsg: string = '';
    formErrors: any = {};

    schema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
    });

    // Toast
    toast = false;
    toggleToast() {
        this.toast = !this.toast;
    }
    toastTitle = 'Validation Error';
    toastBody = '';
    public hideAlert() {
        setTimeout(() => {
            this.alertType = null;
            this.alertmsg = '';
            this.toast = false;
        }, 2000);
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private _service: UserService,
        private _router: Router
    ) {
        this.ForgotForm = fb.group({
            email: ['', [Validators.email, Validators.required]],
        });
        // live validation on change
        this.ForgotForm.valueChanges.subscribe((values) => {
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
        if (this.ForgotForm.get('email')?.value && !this.ForgotForm.valid) {
            this.alertType = 'error';
            this.toastBody = this.alertmsg = 'Invalid email format ';
            this.toggleToast();
            this.hideAlert();
            return;
        }
        if (this.ForgotForm.valid) {
            const emailval = this.ForgotForm.get('email')?.value;
            // const model = {email : emailval};

            // console.log('✅******OTP******** :', model);
            this._service.ForgotPassword({ email: emailval }).subscribe({
                next: (res) => {
                    console.log('✅ Success:', res);
                    this._service.setEmail(emailval);
                    this.alertType = 'success';
                    this._router.navigate(['/authentication/otp-reset']);
                },
                error: (res) => {
                    if (res.status === 400) {
                        // console.log("⚠️ Validation error:", res);
                        this.alertType = 'error';
                        this.alertmsg = 'Validation error';
                    } else if (res.status === 500) {
                        // console.error("🔥 Server error",res);
                        this.alertType = 'warning';
                        this.toastBody = this.alertmsg = 'Server error';
                        this.toggleToast();
                        this.hideAlert();
                    }
                },
            });
        } else {
            this.alertType = 'error';
            this.toastBody = this.alertmsg = 'Email field is required';
            this.toggleToast();
            this.hideAlert();
        }
    }
}
