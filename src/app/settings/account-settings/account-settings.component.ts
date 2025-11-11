import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { countries } from 'countries-list';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as yup from 'yup';

@Component({
    selector: 'app-account-settings',
    imports: [
        FileUploadModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
    ],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
    UpdateForm!: FormGroup;
    token: any;
    email: any = '';
    user: any;
    userType = localStorage.getItem('role');
    alertType: 'success' | 'error' | 'warning' | null = null;
    isBrowser: boolean;
    countriesArr: { code: string; name: string }[] = [];
    loggedEmail = localStorage.getItem('email');

    // Toast
    toast = false;
    toggleToast() {
        this.toast = !this.toast;
    }
    toastTitle = '';
    toastBody = '';
    public hideAlert() {
        setTimeout(() => {
            this.toast = false;
        }, 2000);
    }

    formErrors: any = {};

    schema = yup.object().shape({
        fullName: yup
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
        country: yup.string().required('Country is required'),
        // companyName: yup.string().matches(/^[a-zA-Z ]+$/,'Country Name contains only letters'),
        companyName: yup.string(),
        companyWebsite: yup.string(),
        // companyPhone: yup.string().matches(/^[0-9]{10,15}$/, 'Phone must be 10-15 digits')
        companyPhone: yup.string(),
    });

    constructor(
        private _userService: UserService,
        private fb: FormBuilder,
        private _router: Router,
        @Inject(PLATFORM_ID) private platformId: Object,
        private route: ActivatedRoute
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
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

    ngOnInit() {
        // debugger;
        this.UpdateForm = this.fb.group({
            fullName: ['', Validators.required],
            email: [''],
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
        this.UpdateForm.valueChanges.subscribe((values) => {
            this.validateForm(values);
        });
        const UserName = this.route.snapshot.paramMap.get('name');
        console.log(UserName);
        if (this.isBrowser) {
            const tokk = this._userService.getToken();
            if (this.userType == 'Admin') {
                if (!UserName) {
                    this._userService.UserData().subscribe({
                        next: (res) => {
                            this.user = res.body;
                            this.UpdateForm.patchValue({
                                fullName: this.user.fullName,
                                email: this.user.email,
                                phone: this.user.phone,
                                country: this.user.country,
                                companyName: this.user.companyName,
                                companyWebsite: this.user.companyWebsite,
                                companyPhone: this.user.companyPhone,
                            });
                        },
                        error: (res) => {
                            console.log(res);
                        },
                    });
                } else {
                    console.log(this._userService.getEmailEdit());
                    this._userService
                        .GetByName({ username: UserName })
                        .subscribe({
                            next: (res) => {
                                this.user = res.body;
                                this.UpdateForm.patchValue({
                                    fullName: this.user.fullName,
                                    email: this.user.email,
                                    phone: this.user.phone,
                                    country: this.user.country,
                                    companyName: this.user.companyName,
                                    companyWebsite: this.user.companyWebsite,
                                    companyPhone: this.user.companyPhone,
                                });
                            },
                            error: (res) => {
                                console.log(res);
                            },
                        });
                }
            } else {
                this._userService.UserData().subscribe({
                    next: (res) => {
                        this.user = res.body;
                        this.UpdateForm.patchValue({
                            fullName: this.user.fullName,
                            email: this.user.email,
                            phone: this.user.phone,
                            country: this.user.country,
                            companyName: this.user.companyName,
                            companyWebsite: this.user.companyWebsite,
                            companyPhone: this.user.companyPhone,
                        });
                    },
                    error: (res) => {
                        console.log(res);
                    },
                });
            }
        }
    }

    Update() {
        const userModel = this.UpdateForm.value;
        if (
            this.user.fullName == userModel.fullName &&
            this.user.email == userModel.email &&
            this.user.phone == userModel.phone &&
            this.user.country == userModel.country &&
            this.user.companyName == userModel.companyName &&
            this.user.companyPhone == userModel.companyPhone &&
            this.user.companyWebsite == userModel.companyWebsite
        ) {
            this.toastTitle = 'Error';
            this.toastBody = 'No changes made';
            this.toggleToast();
            this.hideAlert();
            return;
        }
        this._userService.UpdateUser(userModel).subscribe({
            next: (res) => {
                console.log('✅ Success:', res);
                this.alertType = 'success';
                this.toastTitle = '✅ Success';
                this.toastBody = 'Updated profile successsfully';
                this.toggleToast();
                this.hideAlert();
                // this._router.navigate(['/dashboard']);
            },
            error: (res) => {
                if (res.status === 400) {
                    this.toastTitle = 'Error';
                    this.toastBody = 'Please enter valid data';
                    this.toggleToast();
                    this.hideAlert();
                } else if (res.status === 500) {
                    this.toastTitle = 'Error';
                    this.toastBody = 'Internal server error';
                    this.toggleToast();
                    this.hideAlert();
                } else {
                    this.alertType = 'warning';
                    this.toastTitle = 'Error';
                    this.toastBody = 'Internal server error';
                    this.toggleToast();
                    this.hideAlert();
                }
            },
        });
    }
}
