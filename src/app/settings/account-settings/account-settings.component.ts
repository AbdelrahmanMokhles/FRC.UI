import { Component , Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { countries} from 'countries-list';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-account-settings',
    imports: [FileUploadModule,CommonModule,FormsModule,ReactiveFormsModule,
        FormsModule
    ],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {
    UpdateForm! : FormGroup;
    token : any;
    email:any='';
    user : any ;
    userType:'Admin' | 'User' | null = null;
    alertType : 'success' | 'error' | 'warning' | null = null ;
    isBrowser: boolean;
    countriesArr: { code: string; name: string }[] = [];
    // countries: string[] = [
    //     'Egypt',
    //     'Saudi Arabia',
    //     'United States',
    //     'United Kingdom',
    //     'Germany',
    //     'France',
    //     'Canada',
    //     'Australia',
    //     ];
    // File Uploader
    // public multiple: boolean = false;

    constructor(
        private _userService : UserService,
        private fb : FormBuilder,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }


    ngOnInit(){
        // debugger;
        this.UpdateForm = this.fb.group({
            fullName : ['', Validators.required],
            email : [''],
            phone : ['', [Validators.required]],
            country: ['', Validators.required],
            companyName: [''],
            companyWebsite: [''],
            companyPhone: ['']
        });
        

        this.countriesArr = Object.entries(countries).map(([code, value]) => ({
            code,
            name:value.name
        }));
        if(this.isBrowser){
            const tokk = localStorage.getItem("token");
            if(tokk){
                this.token = tokk;
                console.log(this.token);
                this._userService.Profile({token : tokk}).subscribe({
                    next : (res)=>{
                        this.user = res.body;
                        console.log(this.user);

                        this.UpdateForm.patchValue({
                            fullName: this.user.fullName,
                            email: this.user.email,
                            phone: this.user.phone,
                            country: this.user.country,
                            companyName: this.user.companyName,
                            companyWebsite: this.user.companyWebsite,
                            companyPhone: this.user.companyPhone
                        });

                        
                    },
                    error:(res) =>{
                        console.log(res);
                    }
                });
            }
            else{
                this.email=this._userService.getEmail();
                this._userService.GetByEmail({email : this.email}).subscribe({
                    next : (res)=>{
                        this.user = res.body;
                        console.log(this.user);

                        this.UpdateForm.patchValue({
                            fullName: this.user.fullName,
                            email: this.user.email,
                            phone: this.user.phone,
                            country: this.user.country,
                            companyName: this.user.companyName,
                            companyWebsite: this.user.companyWebsite,
                            companyPhone: this.user.companyPhone
                        });

                        
                    },
                    error:(res) =>{
                        console.log(res);
                    }
                });
            }
        }
        // this.UpdateForm.get("email")?.disable();

    }
    
    
    Update(){
        const userModel = this.UpdateForm.value;
        this._userService.UpdateUser(userModel).subscribe({
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
            else
                {
                this.alertType='warning';
                }
            }
                    });
    }
    
}

