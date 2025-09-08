import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/authentication/UserService/user-service';

@Component({
    selector: 'app-reset-password',
    imports: [RouterLink, NgClass,FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './reset-password-otp.component.html',
    styleUrl: './reset-password-otp.component.scss'
})
export class ResetPasswordOtpComponent {

    ResetPassword : FormGroup;
    alertType : 'success' | 'error' | 'warning' | null = null ;


    constructor(
        public themeService: CustomizerSettingsService,
        private fb : FormBuilder,
        private _service : UserService,
        private _router : Router
    ) {
        this.ResetPassword = fb.group({
            NewPassword : ["",[Validators.pattern(/(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
            ConfirmPassword : ["",[Validators.pattern(/(?=.*[a-z])(?=.*[A-Z]).{8,}/)]]
        });
    }

    onSubmit(){
        const newpass = this.ResetPassword.get("NewPassword")?.value;
        const confirmpass = this.ResetPassword.get("ConfirmPassword")?.value;
        if(this.ResetPassword.valid && newpass == confirmpass ){
            const model = {Email : this._service.getEmail(),NewPassword : newpass};

            // console.log('✅******OTP******** :', model);
            this._service.ResetPassword(model)
                        .subscribe({
                                  next: (res) =>{
                                  console.log('✅ Success:', res)
                                  this.alertType = 'success';
                                  this._router.navigate(["/authentication"]);
                                },
                                  error:(res) =>{
                                    if (res.status === 400) 
                                      {
                                        console.log("⚠️ Validation error:", res);
                                        this.alertType='error';
                                      }
                                      else if (res.status === 500) 
                                        {
                                          console.error("🔥 Server error",res);
                                          this.alertType='warning';
                                      }
                                  }
                        });
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
        const inputElement = event.target as HTMLInputElement;
        this.password2 = inputElement.value;
    }
    onPassword3Input(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password3 = inputElement.value;
    }

}