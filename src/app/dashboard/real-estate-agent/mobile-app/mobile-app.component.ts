import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mobile-app',
    imports: [],
    templateUrl: './mobile-app.component.html',
    styleUrl: './mobile-app.component.scss'
})
export class MobileAppComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}