import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { error } from 'console';
import { HttpClientModule } from '@angular/common/http';
import * as yup from 'yup';

@Component({
    selector: 'app-sign-up',
    imports: [RouterLink, NgClass ,FormsModule
        ,ReactiveFormsModule
        ,HttpClientModule,NgIf

    ],
    // providers:[UserService],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    RegisterForm : FormGroup;
    url = "https://localhost:44397/api/Users";
    // user : any;
    alertType : 'success' | 'error' | 'warning' | null = null ;
    formErrors : any = {};

    schema = yup.object().shape({
    fullname: yup.string().required('Full name is required').matches(/^(?=.*[a-z])(?=.*[A-Z])$/),
    phone: yup.string().matches(/^[0-9]{10,15}$/, 'Phone must be 10-15 digits').required('Phone is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        ,'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character')
  });

    constructor(
        private fb : FormBuilder,
        private _service : UserService,
        public themeService: CustomizerSettingsService,
        private _router : Router
        )
        {
            this.RegisterForm = fb.group({
                
                fullname : ["",Validators.required],
                email :["",[Validators.required,Validators.email]],
                password :["",[Validators.required]],
                phone :["",[Validators.required]]
            })

        }

 


    // Password Show/Hide
    password: string = '';
    isPasswordVisible: boolean = false;
    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    onPasswordInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password = inputElement.value;
        this.RegisterForm.get('password')?.setValue(this.password, { emitEvent: false });
        this.RegisterForm.value.password.setValue(this.password, { emitEvent: false });

    }

    ngOnInit(){
    //     this._service.GetAllUsers().subscribe(
    //     {
    //       next:(data)=>{console.log(data)},
    //       error:(err)=>{console.log(err)}
    //     }
    //   );
        // Subscribe to changes for onChange validation
        this.RegisterForm.valueChanges.subscribe(values => {
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

    onSubmit() {
        if (this.RegisterForm.valid) {
            const user = this.RegisterForm.value;
            // console.log('✅******User object******** :', user);
            this._service.RegisterUser(user).subscribe({
                    next: (res) => {
                        console.log(res)
                        if(res.status === 200 && res.body.isAuthenticated == true)
                            {
                            console.log('✅ Success:', res);
                            this._service.setEmail(user.email);
                            console.log(user.email);
                            this._router.navigate(["/authentication/otp"]);
                        }
                    },
                    error:(res) =>{
                        if (res.error instanceof ProgressEvent && res.status === 0) {
                            this.alertType = 'error';
                            alert('⚠️ Cannot connect to server. Please check if the backend is running.');
                        } 
                        else 
                            {
                            this.alertType = 'error';
                            alert(`Error: ${res.error.message}`);
                            }
                        if (res.status === 400) {console.log("⚠️ Validation error:", res.error);}
                        else if (res.status === 500) {console.error("🔥 Server error",res.error.message);}

                    } 
                    }
                )
        }
        
        }
  }

    

