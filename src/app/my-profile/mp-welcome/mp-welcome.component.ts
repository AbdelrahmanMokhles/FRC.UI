import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-welcome',
    imports: [],
    templateUrl: './mp-welcome.component.html',
    styleUrl: './mp-welcome.component.scss'
})
export class MpWelcomeComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}