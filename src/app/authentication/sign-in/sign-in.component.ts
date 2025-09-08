import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/authentication/UserService/user-service';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, NgClass,
        ReactiveFormsModule,FormsModule,
        NgIf
    ],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

    LoginForm : FormGroup;
    alertType : 'success' | 'error' | 'warning' | null = null ;
    

    constructor(
        public themeService: CustomizerSettingsService,
        private fb : FormBuilder,
        private _service : UserService,
        private _router : Router,


    ) {
        this.LoginForm = fb.group({
            email : ["",[Validators.email,Validators.required]],
            password : ["",[Validators.required]]
        });
    }

    onSubmit(){
        if (this.LoginForm.valid) {
            console.log(this.LoginForm.value);
            const usercredentials = this.LoginForm.value;
            // console.log('✅******User object******** :', user);
            this._service.Signin(usercredentials).subscribe({
                    next: (res) => {
                        if(res.status === 200 && res.body.isAuthenticated==true)
                        {
                            debugger
                            console.log('✅ Success:', res)
                            localStorage.setItem("token",res.body.token)
                            // this._service.setEmail(user.email)
                            this._router.navigate(["dashboard/settings"]);
                        }
                        else
                            {
                                this._router.navigate(['']);
                            }
                    },
                    error:(res)=>{
                        debugger
                        // console.log(res);
                        if (res.status === 400)
                                {
                                console.log(this.alertType);
                                this.alertType = "error";
                                console.log("⚠️ Validation error:", res);
                                console.log(this.alertType);
                            }
                            else if (res.status === 500)
                                {
                                console.log(this.alertType);
                                console.error("🔥 Server error",res);
                                this.alertType = "warning";
                                console.log(this.alertType);
                                }
                        else
                            {
                                this._router.navigate(['authentication']);
                            }
                    }
            });
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