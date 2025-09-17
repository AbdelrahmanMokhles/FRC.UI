import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
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
import * as yup from 'yup';

@Component({
    selector: 'app-reset-password',
    imports: [
        RouterLink,
        NgClass,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    templateUrl: './reset-password-otp.component.html',
    styleUrl: './reset-password-otp.component.scss',
})
export class ResetPasswordOtpComponent {
    ResetPassword: FormGroup;
    alertType: 'success' | 'error' | 'warning' | null = null;
    formErrors: any = {};
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
            this.alertType = null; // hides alert
            this.alertmsg = '';
            this.toast = false;
        }, 2000);
    }

    schema = yup.object().shape({
        NewPassword: yup
            .string()
            .required('New password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
            ),
        ConfirmPassword: yup
            .string()
            .oneOf([yup.ref('NewPassword')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    constructor(
        public themeService: CustomizerSettingsService,
        private fb: FormBuilder,
        private _service: UserService,
        private _router: Router
    ) {
        this.ResetPassword = fb.group({
            NewPassword: [
                '',
                [
                    Validators.pattern(/(?=.*[a-z])(?=.*[A-Z]).{8,}/),
                    Validators.required,
                ],
            ],
            ConfirmPassword: [
                '',
                [
                    Validators.pattern(/(?=.*[a-z])(?=.*[A-Z]).{8,}/),
                    Validators.required,
                ],
            ],
        });

        // ✅ validate on every change
        this.ResetPassword.valueChanges.subscribe(() => this.validateForm());
    }

    async validateForm() {
        try {
            await this.schema.validate(this.ResetPassword.value, {
                abortEarly: false,
            });
            this.formErrors = {}; // clear all if valid
        } catch (err: any) {
            this.formErrors = {};
            if (err.inner) {
                err.inner.forEach((e: any) => {
                    this.formErrors[e.path] = e.message;
                });
            }
        }
    }

    onSubmit() {
        const newpass = this.ResetPassword.get('NewPassword')?.value;
        const confirmpass = this.ResetPassword.get('ConfirmPassword')?.value;
        if (newpass != confirmpass && newpass != '' && confirmpass != '') {
            this.alertType = 'error';
            this.toastBody = this.alertmsg = 'Passwords do not match';
            this.toastTitle = 'Error';
            this.toggleToast();
            this.hideAlert();

            return;
        }
        if (this.ResetPassword.valid && newpass == confirmpass) {
            const model = {
                Email: this._service.getEmail(),
                NewPassword: newpass,
            };
            if (!model.Email) {
                this.toastBody = this.alertmsg =
                    'Error occured , please try again later';
                this.toastTitle = 'Error';
                this.toggleToast();
                this.hideAlert();
                return;
            }
            // console.log('✅******OTP******** :', model);
            this._service.ResetPassword(model).subscribe({
                next: (res) => {
                    console.log('✅ Success:', res);
                    this.alertType = 'success';
                    this.toastTitle = 'Success';
                    this.toastBody = 'Password changed successsfully';
                    this.toggleToast();
                    this.hideAlert();
                    this._router.navigate(['/authentication']);
                },
                error: (res) => {
                    if (res.status === 400) {
                        // console.log('⚠️ Validation error:', res);
                        this.toastBody = this.alertmsg =
                            'Error occured , please try again later';
                        this.toastTitle = 'Error';
                        this.toggleToast();
                        this.hideAlert();
                        // this.alertType='error';
                    } else if (res.status === 500) {
                        console.error('🔥 Server error', res);
                        this.alertType = 'warning';
                        this.toastBody = this.alertmsg =
                            'Internal server error';
                        this.toastTitle = 'Error';
                        this.toggleToast();
                        this.hideAlert();
                    } else {
                        this.alertType = 'warning';
                        this.toastBody = this.alertmsg =
                            'Internal server error';
                        this.toastTitle = 'Error';
                        this.toggleToast();
                        this.hideAlert();
                    }
                },
            });
        }
        if (newpass == '' || confirmpass == '') {
            this.toastBody = this.alertmsg = 'Enter Required Fields';
            this.toastTitle = 'Error';
            this.toggleToast();
            this.hideAlert();
        }
        if (this.formErrors.NewPassword) {
            this.toastBody = 'Please enter valid password';
            this.toastTitle = 'Error';
            this.toggleToast();
            this.hideAlert();
        }
    }

    // Password Show/Hide
    // password1: string = '';
    password2: string = '';
    password3: string = '';
    isPassword1Visible: boolean = false;
    isPassword2Visible: boolean = false;
    isPassword3Visible: boolean = false;
    // togglePassword1Visibility(): void {
    //     this.isPassword1Visible = !this.isPassword1Visible;
    // }
    togglePassword2Visibility(): void {
        this.isPassword2Visible = !this.isPassword2Visible;
    }
    togglePassword3Visibility(): void {
        this.isPassword3Visible = !this.isPassword3Visible;
    }
    // onPassword1Input(event: Event): void {
    //     const inputElement = event.target as HTMLInputElement;
    //     this.password1 = inputElement.value;
    // }
    onPassword2Input(event: Event): void {
        // const inputElement = event.target as HTMLInputElement;
        // this.password2 = inputElement.value;
    }
    onPassword3Input(event: Event): void {
        // const inputElement = event.target as HTMLInputElement;
        // this.password3 = inputElement.value;
    }
}
