import { Component , OnInit} from '@angular/core';
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

    ngOnInit(){
        if(localStorage.getItem("token")){
            const tokk = localStorage.getItem("token");
            console.log(this.token);
            this._userService.Profile({token : tokk}).subscribe({
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

}