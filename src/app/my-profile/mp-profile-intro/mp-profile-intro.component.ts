import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-profile-intro',
    imports: [],
    templateUrl: './mp-profile-intro.component.html',
    styleUrl: './mp-profile-intro.component.scss'
})
export class MpProfileIntroComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}