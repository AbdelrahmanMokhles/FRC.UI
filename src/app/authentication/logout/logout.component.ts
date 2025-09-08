import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-logout',
    imports: [RouterLink,CommonModule],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.scss'
})
export class LogoutComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}


    ngOnIt(){
        localStorage.removeItem('token');
    }
}