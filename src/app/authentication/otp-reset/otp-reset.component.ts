import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { BehaviorSubject, interval, map, Subscription, takeWhile } from 'rxjs';

@Component({
  standalone:true,
  selector: 'app-otp',
  imports: [
    FormsModule, ReactiveFormsModule,
    HttpClientModule,NgIf
  ],
  templateUrl: './otp-reset.component.html',
  styleUrl: './otp-reset.component.scss'
})
export class otpResetcomponent {
      ConfirmForm : FormGroup;
      private email!: string;
      alertType : 'success' | 'error' | 'warning' | null = null ;
      alertmsg:string='';

      private readonly TOTAL_SECONDS = 1 * 60; // 3 minutes
      private timerSub: Subscription | null = null;

      // remaining seconds stream (for template binding if needed)
      remaining = new BehaviorSubject<number>(0);

      constructor (
          private fb : FormBuilder,
          private _service : UserService,
          public themeService: CustomizerSettingsService,
          private _router : Router
      )
      {

        this.ConfirmForm = fb.group({
                  otp : ["",Validators.required]
              })

      }

      // convenience flag used in template
      get isRunning() {
        return (this.remaining.value > 0);
      }

      ngOnInit() {
          this.email = this._service.getEmail();
          this.startCountdown();
      }


      onSubmit() {
        if (this.ConfirmForm.valid) {
            const otp = this.ConfirmForm.get('otp')?.value;
            const model = {email : this.email,otp : otp};

            // console.log('✅******OTP******** :', model);
            this._service.VerifyEmail({
              email : this.email,
              otp : otp})
                        .subscribe({
                                  next: (res) =>{
                                  console.log('✅ Success:', res)
                                  this.alertType = 'success';
                                  this.alertmsg = 'Successfully sent OTP';
                                  this._router.navigate(["/authentication/reset-password-otp"]);
                                },
                                error:(res) =>{
                                  if (res.status === 400) 
                                    {
                                      console.log("⚠️ Validation error:", res);
                                      this.alertType='error';
                                      this.alertmsg = 'Invalid OTP';
                                    }
                                    else if (res.status === 500) 
                                      {
                                        console.error("🔥 Server error",res);
                                        this.alertType='warning';
                                        this.alertmsg = 'Error Occured';
                                      }
                                  }
                        });
        }
        else{
          this.alertType='error';
          this.alertmsg = 'Please Enter OTP';
        }
      }
      
      ResendOtp(){
        console.log("Resending to "+this.email);
        this.startCountdown();
        // const email = this.email;
        const model = {email : this.email,otp : ""}
        this._service.ResendOtp(model).
                                      subscribe(
                                        {
                                          next: (res) =>
                                            {
                                              console.log('✅ Success:', res)
                                              this.alertType='success';
                                              this.startCountdown();
                                            },
                                          error:(res) =>{
                                                          if (res.status === 200) {
                                                            console.log('✅ Success:', res)
                                                            this.alertType='success';
                                                          }

                                                          if (res.status === 400) 
                                                            {
                                                              console.log("⚠️ Validation error:", res);
                                                              this.alertType='error';

                                                            }
                                                          else if (res.status === 500) {console.error("🔥 Server error",res.error.message);}
                                                        }
                                        }
                                        
                                    );
      }

      ngOnDestroy(): void {
    this.clearTimer();
  }

  startCountdown(): void {
    // reset to full duration
    this.clearTimer();
    this.remaining.next(this.TOTAL_SECONDS);

    // emit every 1 second
    this.timerSub = interval(1000).pipe(
      map(tick => this.TOTAL_SECONDS - (tick + 1)), // subtract 1 immediately after first tick
      takeWhile(val => val >= 0)
    ).subscribe({
      next: (sec) => {
        // clamp to >=0
        this.remaining.next(Math.max(0, sec));
      },
      complete: () => {
        // final ensure zero
        this.remaining.next(0);
        this.clearTimer();
      }
    });
  }

  resetCountdown(): void {
    this.startCountdown();
  }

  clearTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  // returns formatted MM:SS string
  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const ss = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${mm}:${ss}`;
  }

  // The "protected" action invoked when the button is active
  onProtectedAction(): void {
    if (this.isRunning) {
      // Shouldn't happen because button is disabled while running,
      // but guard anyway
      return;
    }
    // TODO: replace with your action
    alert('Button clicked — action executed!');
  }
}
