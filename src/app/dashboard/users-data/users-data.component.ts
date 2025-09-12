import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { CommonModule, NgIf } from '@angular/common';
import { AdminService } from '../../Services/AdminService/admin-service';

@Component({
    selector: 'app-users-list',
    imports: [RouterLink,CommonModule,NgIf],
    templateUrl: './users-data.component.html',
    styleUrl: './users-data.component.scss'
})
export class UsersDataComponent {

    users : any;
    reqEmail:string = '';
    constructor(
        private _userService : UserService,
        private _adminService : AdminService,
        private _router : Router

    ){}

    // Card Header Menu
    isCardHeaderOpen = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-header-menu')) {
            this.isCardHeaderOpen = false;
        }
    }

    modalBody:string='';
    btnText:'Delete' | 'Save' | null = null;
    modalTitle:string='';

    deletePop(em:string){
        this.reqEmail=em;
        this.classApplied = !this.classApplied;
        this.modalBody=`Confirm Delete User with Email ${this.reqEmail}`;
        this.btnText='Delete'
        this.modalTitle='Delete';

    }

    edit(email:any){
        this._userService.setEmail(email);
        this._router.navigate(["dashboard/settings"])
    }

    ApplyChange(){
        if(this.btnText == 'Delete')
            this.DeleteUser(this.reqEmail);
        // this._userService.GetAllUsers().subscribe();
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
        // this._router.navigate(['dashboard/user-data'])
    }
    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }
    classApplied3 = false;
    toggleClass3() {
        this.classApplied3 = !this.classApplied3;
    }
    
    

    ngOnInit(){
        this._adminService.GetAllUsers().subscribe({
            next:(res)=>{
                console.log(res);
                this.users = res;
                console.log(this.users);

            }
        })
    }

    DeleteUser(em:any){
        // const model = {Email:email};
        debugger
        em=this.reqEmail;
        console.log(em);
        this._userService.DeleteUser(em).subscribe({
            next:(res)=>{
                console.log(res);
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }


}