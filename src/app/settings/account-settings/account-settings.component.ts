import { Component , OnInit} from '@angular/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-account-settings',
    imports: [FileUploadModule,CommonModule],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {

    token : any;
    user : any ;
    countries: string[] = [
        'Egypt',
        'Saudi Arabia',
        'United States',
        'United Kingdom',
        'Germany',
        'France',
        'Canada',
        'Australia',
        ];

    constructor(
        private _userService : UserService
    ){

    }

    // File Uploader
    public multiple: boolean = false;

    ngOnInit(){
        if(localStorage.getItem("token")){
            const tokk = localStorage.getItem("token");
            this.token = tokk;
            console.log(this.token);
            this._userService.Profile({token : tokk}).subscribe({
                next : (res)=>{
                    this.user = res.body;
                    console.log(this.user);
                },
                error:(res) =>{
                    console.log(res);
                }
            });
        }
    }

}