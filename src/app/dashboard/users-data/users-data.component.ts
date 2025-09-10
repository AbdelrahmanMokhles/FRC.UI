import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-users-list',
    imports: [RouterLink,CommonModule],
    templateUrl: './users-data.component.html',
    styleUrl: './users-data.component.scss'
})
export class UsersDataComponent {

    users : any;

    constructor(
        private _userService : UserService

    ){}

    ngOnInit(){
        this._userService.GetAllUsers().subscribe({
            next:(res)=>{
                console.log(res);
                this.users = res;
                console.log(this.users);

            }
        })
    }


}