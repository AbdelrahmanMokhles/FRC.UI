import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-customer-visits',
    imports: [],
    templateUrl: './customer-visits.component.html',
    styleUrl: './customer-visits.component.scss'
})
export class CustomerVisitsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}