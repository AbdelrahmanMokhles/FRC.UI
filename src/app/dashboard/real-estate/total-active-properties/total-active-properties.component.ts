import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-active-properties',
    imports: [],
    templateUrl: './total-active-properties.component.html',
    styleUrl: './total-active-properties.component.scss'
})
export class TotalActivePropertiesComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}