import { Component } from '@angular/core';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { UserService } from '../../Services/authentication/UserService/user-service';

@Component({
    selector: 'app-account-settings',
    imports: [FileUploadModule],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {

    token : any;

    constructor(
        private _userService : UserService
    ){

    }

    // File Uploader
    public multiple: boolean = false;

    ngOnit(){
        this.token = localStorage.getItem("token");
        this._userService.Profile(this.token).subscribe({
            next : (res)=>{
                console.log(this.token);
                console.log(res);
                console.log(res.body);
            },
            error:(res) =>{
                console.log(res);
            }
        });
    }

}