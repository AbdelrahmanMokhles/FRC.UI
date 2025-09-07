import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-ad-spend',
    imports: [],
    templateUrl: './ad-spend.component.html',
    styleUrl: './ad-spend.component.scss'
})
export class AdSpendComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}