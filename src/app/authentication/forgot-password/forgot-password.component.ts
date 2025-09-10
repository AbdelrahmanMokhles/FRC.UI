import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
    selector: 'app-forgot-password',
    imports: [RouterLink,FormsModule,
        ReactiveFormsModule,CommonModule,NgIf
    ],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

    ForgotForm : FormGroup;
    alertType : 'success' | 'error' | 'warning' | null = null ;
    alertmsg : string ='';


    constructor(
        public themeService: CustomizerSettingsService,
        private fb : FormBuilder,
        private _service : UserService,
        private _router : Router
    ) {
        this.ForgotForm = fb.group({
            Email:["",[Validators.required,Validators.email]]
        })
    }


    onSubmit(){
        if (this.ForgotForm.valid) {
            const emailval = this.ForgotForm.get('Email')?.value;
            // const model = {email : emailval};

            // console.log('✅******OTP******** :', model);
            this._service.ForgotPassword({email : emailval})
                        .subscribe({
                                  next: (res) =>{
                                  console.log('✅ Success:', res)
                                  this._service.setEmail(emailval);
                                  this.alertType = 'success';
                                  this._router.navigate(["/authentication/otp-reset"]);
                                },
                                  error:(res) =>{
                                    if (res.status === 400) 
                                      {
                                        // console.log("⚠️ Validation error:", res);
                                        this.alertType='error';
                                        this.alertmsg='Validation error';
                                      }
                                      else if (res.status === 500) 
                                        {
                                          // console.error("🔥 Server error",res);
                                          this.alertType='warning';
                                          this.alertmsg='Server error';
                                      }
                                  }
                        });
        }
        else{
          this.alertType='error';
          this.alertmsg='Email field is required';
        }
      }
}
    