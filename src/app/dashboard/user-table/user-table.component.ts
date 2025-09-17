// import { Component, HostListener } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
// import { UserService } from '../../Services/authentication/UserService/user-service';
// import { AdminService } from '../../Services/AdminService/admin-service';
// import { Router } from 'express';
// import { CommonModule, NgIf } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//     selector: 'app-bt-recent-leads',
//     imports: [RouterLink,CommonModule,NgIf,FormsModule],
//     templateUrl: './user-table.component.html',
//     styleUrl: './user-table.component.scss'
// })
// export class UserTableComponent {


//     users: any;
//     reqEmail:string = '';

//     constructor(
//         public themeService: CustomizerSettingsService,
//         private _userService : UserService,
//         private _adminService : AdminService,
//         private _router : Router
//     ) {}
    
        

//     // Selection
//     SelectedUsers = new Set<string>();
//     SelectedAction : 'Enable' | 'Disable' | 'DeleteSelected' | null = null;

//     isAllSelected()   {
//         return this.SelectedUsers.size>0 && this.SelectedUsers.size === this.users.length 
//     } 

//     toggleAll(event:any){
//         if(event.target.checked){
//             // this.SelectedUsers = this.users.map(u=>u.email)
//             this.SelectedUsers = new Set(this.users.map((u: any) => u.email));
//         }
//         else{
//             this.SelectedUsers.clear();
//         }
//         console.log(this.SelectedUsers);
//     }

//     toggleSelection(email:string,event:any){
//         if(event.target.checked){
//             this.SelectedUsers.add(email);
//         }
//         else{
//             this.SelectedUsers.delete(email);
//         }
//         console.log(this.SelectedUsers);

//     }



//     // Modal
//     btnText:'Delete' | 'Save' | 'Enable' | 'Disable' | null = null;
//     modalBody:string='';
//     modalTitle:string='';

//     classApplied = false;
//     toggleClass() {
//         this.classApplied = !this.classApplied;
//     }

//     ShowPopUp(){
//         this.toggleClass();

//         switch (this.SelectedAction) {
//             case 'Enable':
//             this.modalTitle = 'Enable Users';
//             this.modalBody = 'Are you sure you want to enable the selected users?';
//             this.btnText = 'Enable';
//             break;

//             case 'Disable':
//             this.modalTitle = 'Disable Users';
//             this.modalBody = 'Are you sure you want to disable the selected users?';
//             this.btnText = 'Disable';
//             break;

//             case 'DeleteSelected':
//             this.modalTitle = 'Delete Users';
//             this.modalBody = 'This action cannot be undone. Delete selected users?';
//             this.btnText = 'Delete';
//             break;
            
//         }        
//     }


//     // Card Header Menu
//     isCardHeaderOpen = false;
//     toggleCardHeaderMenu() {
//         this.isCardHeaderOpen = !this.isCardHeaderOpen;
//     }
//     @HostListener('document:click', ['$event'])
//     handleClickOutside(event: Event) {
//         const target = event.target as HTMLElement;
//         if (!target.closest('.trezo-card-header-menu')) {
//             this.isCardHeaderOpen = false;
//         }
//     }

// }