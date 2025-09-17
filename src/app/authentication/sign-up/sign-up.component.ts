import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { error } from 'console';
import { countries } from 'countries-list';
import { HttpClientModule } from '@angular/common/http';
import * as yup from 'yup';

@Component({
    selector: 'app-sign-up',
    imports: [
        RouterLink,
        NgClass,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgIf,
        NgFor,
        CommonModule,
    ],
    // providers:[UserService],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    RegisterForm!: FormGroup;
    url = 'https://localhost:44397/api/Users';
    // user : any;
    alertType: 'success' | 'error' | 'warning' | null = null;
    alertmsg: string = '';

    // Toast
    toast = false;
    toggleToast() {
        this.toast = !this.toast;
    }
    toastTitle = 'Validation Error';
    toastBody = '';

    formErrors: any = {};
    countriesArr: { code: string; name: string }[] = [];

    schema = yup.object().shape({
        fullname: yup
            .string()
            .required('Full name is required')
            .matches(/^[a-zA-Z ]+$/, 'Full Name contains only letters'),
        phone: yup
            .string()
            .matches(/^[0-9]{10,15}$/, 'Phone must be 10-15 digits')
            .required('Phone is required'),
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
            ),
        country: yup.string().required('Country is required'),
        // companyName: yup.string().matches(/^[a-zA-Z ]+$/,'Country Name contains only letters'),
        companyName: yup.string(),
        companyWebsite: yup.string(),
        // companyPhone: yup.string().matches(/^[0-9]{10,15}$/, 'Phone must be 10-15 digits')
        companyPhone: yup.string(),
    });

    constructor(
        private fb: FormBuilder,
        private _service: UserService,
        public themeService: CustomizerSettingsService,
        private _router: Router
    ) {}

    // Password Show/Hide
    password: string = '';
    isPasswordVisible: boolean = false;
    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    onPasswordInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password = inputElement.value;
        // this.RegisterForm.get('password')?.setValue(this.password, { emitEvent: false });
        // this.RegisterForm.value.password.setValue(this.password, { emitEvent: false });
    }

    ngOnInit() {
        //     this._service.GetAllUsers().subscribe(
        //     {
        //       next:(data)=>{console.log(data)},
        //       error:(err)=>{console.log(err)}
        //     }
        //   );
        this.RegisterForm = this.fb.group({
            fullname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            country: ['', Validators.required],
            companyName: [''],
            companyWebsite: [''],
            companyPhone: [''],
        });

        this.countriesArr = Object.entries(countries).map(([code, value]) => ({
            code,
            name: value.name,
        }));
        // Subscribe to changes for onChange validation
        this.RegisterForm.valueChanges.subscribe((values) => {
            this.validateForm(values);
        });
    }

    async validateForm(values: any) {
        try {
            await this.schema.validate(values, { abortEarly: false });
            this.formErrors = {}; // clear errors if valid
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

    hideAlert() {
        setTimeout(() => {
            this.alertType = null; // hides alert
            this.alertmsg = '';
            this.toast = false;
        }, 2000);
    }

    onSubmit() {
        if (this.formErrors.fullname) {
            if (!this.RegisterForm.get('fullname')?.value) {
                this.alertType = 'error';
                this.toastBody = this.alertmsg = 'Full name is required';
                this.toggleToast();
                this.hideAlert();
                return;
            }
            this.alertType = 'error';
            this.toastBody = this.alertmsg =
                'Invalid Name ,' + this.formErrors.fullname;
            this.toggleToast();
            this.hideAlert();
            return;
        }
        if (this.formErrors.email) {
            if (!this.RegisterForm.get('email')?.value) {
                this.alertType = 'error';
                this.toastBody = this.alertmsg = 'Email is required';
                this.toggleToast();
                this.hideAlert();
                return;
            }
            this.alertType = 'error';
            this.toastBody = this.alertmsg =
                'Invalid Email ' + this.formErrors.email;
            this.toggleToast();
            this.hideAlert();
            return;
        }
        if (this.formErrors.password) {
            if (!this.RegisterForm.get('password')?.value) {
                this.alertType = 'error';
                this.toastBody = this.alertmsg = 'Password is required';
                this.toggleToast();
                this.hideAlert();
                return;
            }
            this.alertType = 'error';
            this.toastBody = this.alertmsg =
                'Invalid Password ' + this.formErrors.password;
            this.toggleToast();
            this.hideAlert();
            return;
        }
        if (this.formErrors.phone) {
            if (!this.RegisterForm.get('phone')?.value) {
                this.alertType = 'error';
                this.toastBody = this.alertmsg = 'Phone is required';
                this.toggleToast();
                this.hideAlert();
                return;
            }
            this.alertType = 'error';
            this.toastBody = this.alertmsg =
                'Invalid Phone ' + this.formErrors.phone;
            this.toggleToast();
            this.hideAlert();
            return;
        }
        if (this.RegisterForm.valid) {
            const user = this.RegisterForm.value;
            // console.log('✅******User object******** :', user);
            this._service.RegisterUser(user).subscribe({
                next: (res) => {
                    console.log(res);
                    if (
                        res.status === 200 &&
                        res.body.isAuthenticated == true
                    ) {
                        console.log('✅ Success:', res);
                        this._service.setEmail(user.email);
                        console.log(user.email);
                        this._router.navigate(['/authentication/otp']);
                    }
                },
                error: (res) => {
                    if (
                        res.error instanceof ProgressEvent ||
                        res.status === 0
                    ) {
                        this.alertType = 'error';
                        this.toastTitle = 'Internal Server Error';
                        this.toastBody = this.alertmsg =
                            'Cannot connect to server';
                        this.toggleToast();
                        this.hideAlert();
                        // alert('⚠️ Cannot connect to server. Please check if the backend is running.');
                    }
                    if (res.status === 400) {
                        console.log('⚠️ Validation error:', res.error);
                        this.alertType = 'error';
                        this.toastBody = this.alertmsg = res.error.message;
                        this.toggleToast();
                        this.hideAlert();
                    } else if (res.status === 500) {
                        console.error('🔥 Server error', res.error.message);
                        this.alertType = 'error';
                        this.toastBody = this.alertmsg = res.error.message;
                        this.toggleToast();
                        this.hideAlert();
                    }
                },
            });
        } else {
            this.alertType = 'error';
            this.toastBody = this.alertmsg = 'Please fill reqiured fields';
            this.toggleToast();
            this.hideAlert();
        }
    }
}
