import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../Services/authentication/UserService/user-service';

@Component({
    selector: 'app-change-password',
    imports: [RouterLink, NgClass,CommonModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

    token : any;
    user : any;
    alertType : 'success' | 'error' | 'warning' | null = null ;


    constructor(
        private _userService : UserService
    ){

    }

    // Password Show/Hide
    password1: string = '';
    password2: string = '';
    password3: string = '';
    isPassword1Visible: boolean = false;
    isPassword2Visible: boolean = false;
    isPassword3Visible: boolean = false;

    Change(){
        debugger
        this.token = localStorage.getItem('token');
        this._userService.Profile({token : this.token}).subscribe({
                next : (res)=>{
                    this.user = res.body;
                    console.log(this.user);
                },
                error:(res) =>{
                    console.log(res);
                }
            });
        if(this.password2== this.password3 && this.password1 == this.user.password){
            const model = {Email : this.user.email,NewPassword : this.password2};

            // console.log('✅******OTP******** :', model);
            this._userService.ResetPassword(model)
                        .subscribe({
                                  next: (res) =>{
                                  console.log('✅ Success:', res)
                                  this.alertType = 'success';
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
                                      else{
                                        this.alertType='warning';
                                      }
                                  }
                        });
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
    }
    onPassword2Input(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password2 = inputElement.value;
    }
    onPassword3Input(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password3 = inputElement.value;
    }

}