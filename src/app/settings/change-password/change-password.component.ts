import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { AdminService } from '../../Services/AdminService/admin-service';
import * as yup from 'yup';

@Component({
    selector: 'app-change-password',
    imports: [RouterLink, NgClass, CommonModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
    token: any;
    user: any;
    alertType: 'success' | 'error' | 'warning' | null = null;
    alertmsg = '';
    email: string = '';
    userType = localStorage.getItem('role');
    formErrors: any = {};

    schema = yup.object().shape({
        password1: yup
            .string()
            .required('Old password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
            ),
        password2: yup
            .string()
            .required('New password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
            ),
        password3: yup
            .string()
            .oneOf([yup.ref('password2')], 'Passwords must match')
            .required('Confirm password is required'),
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
            this.toast = false;
        }, 2000);
    }

    constructor(
        private _userService: UserService,
        private _adminService: AdminService
    ) {}

    ngOnIt() {
        // console.log(this.userType);
    }

    isFormValid(): boolean {
        return (
            !this.formErrors.password1 &&
            !this.formErrors.password2 &&
            !this.formErrors.password3 &&
            this.password1 !== '' &&
            this.password2 !== '' &&
            this.password3 !== ''
        );
    }
    async validateField(field: string) {
        try {
            await this.schema.validateAt(field, {
                password1: this.password1,
                password2: this.password2,
                password3: this.password3,
            });
            delete this.formErrors[field]; // clear error if valid
        } catch (err: any) {
            this.formErrors[field] = err.message;
        }
    }

    // Password Show/Hide
    password1: string = '';
    password2: string = '';
    password3: string = '';
    isPassword1Visible: boolean = false;
    isPassword2Visible: boolean = false;
    isPassword3Visible: boolean = false;

    Change() {
        // debugger;
        if (
            this.password1 == this.password2 &&
            this.password2 == this.password3
        ) {
            this.toastTitle = 'Error';
            this.toastBody = 'Passwords cannot be the same';
            this.toggleToast();
            this.hideAlert();
        }
        if (this.isFormValid()) {
            this.token = localStorage.getItem('token');
            this._userService.Profile({ token: this.token }).subscribe({
                next: (res) => {
                    this.user = res.body;
                    console.log(this.user);
                    console.log('✅******OTP******** :', model);
                    this._userService.ChangePassword(model).subscribe({
                        next: (res) => {
                            console.log(res);
                            this.toastTitle = '✅ Success';
                            this.toastBody = res.body.message;
                            this.toggleToast();
                            this.hideAlert();
                        },
                        error: (res) => {
                            if (res.status === 400) {
                                console.log(res);
                                this.toastTitle = 'Error';
                                this.toastBody = res.error.message;
                                this.toggleToast();
                                this.hideAlert();
                            } else if (res.status === 500) {
                                console.log(res.body);
                                this.toastTitle = 'Error';
                                this.toastBody = res.error.message;
                                this.toggleToast();
                                this.hideAlert();
                            } else {
                                console.log(res.body);
                                this.toastTitle = 'Error';
                                this.toastBody = res.error.message;
                                this.toggleToast();
                                this.hideAlert();
                            }
                        },
                    });
                },
                error: (res) => {
                    console.log(res);
                },
            });

            const model = {
                Email: this.user.email,
                NewPassword: this.password2,
                OldPassword: this.password1,
            };
        } else {
            this.alertType = 'error';
            this.alertmsg = 'Passwords do not match';
        }
    }

    ChangeForAdmin() {
        debugger;
        this.email = this._userService.getEmail();
        this._userService.GetByEmail({ email: this.email }).subscribe({
            next: (res) => {
                this.user = res.body;
                console.log(this.user);
            },
            error: (res) => {
                console.log(res);
            },
        });

        const model = { Email: this.email, NewPassword: this.password2 };

        // console.log('✅******OTP******** :', model);
        if (this.password2 == this.password3) {
            this._adminService.ChangePassword(model).subscribe({
                next: (res) => {
                    console.log('✅ Success:', res);
                    this.alertType = 'success';
                    this.alertmsg = 'Password Changed Successfully';
                },
                error: (res) => {
                    if (res.status === 400) {
                        console.log('⚠️ Validation error:', res);
                        this.alertType = 'error';
                    } else if (res.status === 500) {
                        console.error('🔥 Server error', res);
                        this.alertType = 'warning';
                    } else {
                        this.alertType = 'warning';
                    }
                },
            });
        } else {
            this.alertType = 'error';
            this.alertmsg = 'Passwords do not match';
        }
    }

    togglePassword1Visibility(): void {
        this.isPassword1Visible = !this.isPassword1Visible;
    }
    togglePassword2Visibility(): void {
        this.isPassword2Visible = !this.isPassword2Visible;
    }
    togglePassword3Visibility(): void {
        this.isPassword3Visible = !this.isPassword3Visible;
    }
    onPassword1Input(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password1 = inputElement.value;
        this.validateField('password1');
    }
    onPassword2Input(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password2 = inputElement.value;
        this.validateField('password2');
    }
    onPassword3Input(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password3 = inputElement.value;
        this.validateField('password3');
    }
}
