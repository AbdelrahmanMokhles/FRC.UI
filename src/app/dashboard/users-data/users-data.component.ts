import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../Services/authentication/UserService/user-service';
import { CommonModule, NgIf } from '@angular/common';
import { AdminService } from '../../Services/AdminService/admin-service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-users-list',
    imports: [RouterLink,CommonModule,NgIf,FormsModule],
    templateUrl: './users-data.component.html',
    styleUrl: './users-data.component.scss'
})
export class UsersDataComponent {


    users: any;
    reqEmail:string = '';
    
    constructor(
        private _userService : UserService,
        private _adminService : AdminService,
        private _router : Router

    ){

    }

    // Card Header Menu
    isCardHeaderOpen = false;
    isDropdownOpen = false;

    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    toggleDropdownBtn() {
        this.isDropdownOpen = !this.isDropdownOpen;
        console.log(this.isDropdownOpen);
    }

    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-header-menu')) {
            this.isCardHeaderOpen = false;
        }
        
        if (!target.closest('.dropdown1')) {
            this.isDropdownOpen = false;
        }
    }

    modalBody:string='';
    btnText:'Delete' | 'Save' | null = null;
    modalTitle:string='';

    deletePop(em:string){
        debugger
        this.classApplied=true;
        this.reqEmail=em;
        // this.classApplied = !this.classApplied;
        this.modalBody=`Confirm Delete User with Email ${this.reqEmail}`;
        this.btnText='Delete'
        this.modalTitle='Delete';

    }

    edit(email:any){
        this._userService.setEmail(email);
        this._router.navigate(["dashboard/settings"])
    }

    PopUpApplyChange(){
        debugger
        if(this.btnText == 'Delete')
            this.DeleteUser(this.reqEmail);
        // this._userService.GetAllUsers().subscribe();
        
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }
    // classApplied2 = false;
    // toggleClass2() {
    //     this.classApplied2 = !this.classApplied2;
    // }
    // classApplied3 = false;
    // toggleClass3() {
    //     this.classApplied3 = !this.classApplied3;
    // }
    
    

    ngOnInit(){
        this._adminService.GetUsersOnly().subscribe({
            next:(res)=>{
                console.log(res);
                this.users = res;
                // this.users = res.map();
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
                this.refreshUsers();
                this.toggleClass();
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }

    ShowPopUp(){
        this.toggleClass();
        this.modalBody=`Applied Changed Successfully`;
        this.modalTitle='Success';
    }
    
    //#region Check All 
    SelectedUsers = new Set<string>();
    SelectedAction : 'Enable' | 'Disable' | 'DeleteSelected' | null = null;

    isAllSelected()   {
        return this.SelectedUsers.size>0 && this.SelectedUsers.size === this.users.length 
    } 

    toggleAll(event:any){
        if(event.target.checked){
            // this.SelectedUsers = this.users.map(u=>u.email)
            this.SelectedUsers = new Set(this.users.map((u: any) => u.email));
        }
        else{
            this.SelectedUsers.clear();
        }
        console.log(this.SelectedUsers);
    }

    toggleSelection(email:string,event:any){
        if(event.target.checked){
            this.SelectedUsers.add(email);
        }
        else{
            this.SelectedUsers.delete(email);
        }
        console.log(this.SelectedUsers);

    }

    ApplySelection(){   
        debugger
        // let model = {emails : this.SelectedUsers};
        let selectedarr = Array.from(this.SelectedUsers);
        console.log(this.SelectedAction)
        switch (this.SelectedAction) {
            case 'Enable':
            this._adminService.EnableSelected(selectedarr).subscribe({
                next: res => {
                console.log('Users enabled:', res);
                this.refreshUsers();
                this.ShowPopUp();
                },
                error: err => console.error(err)
            });
            break;

            case 'Disable':
            this._adminService.DisableSelected(selectedarr).subscribe({
                next: res => {
                console.log('Users disabled:', res);
                this.refreshUsers();
                this.ShowPopUp();
                },
                error: err => console.error(err)
            });
            break;

            case 'DeleteSelected':
            this._adminService.DeleteSelected(selectedarr).subscribe({
                next: res => {
                console.log('Users deleted:', res);
                this.refreshUsers();
                this.ShowPopUp();
                },
                error: err => console.error(err)
            });
            break;
        }

        // reset after applying
        this.SelectedUsers.clear();
        this.SelectedAction = null;
        }

        // reload user list
        refreshUsers() {
        this._adminService.GetUsersOnly().subscribe({
            next: (res) => {
            this.users = res;
            }
        });
        }
        //#endregion
    }

    
    


