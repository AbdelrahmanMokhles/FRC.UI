import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-new-customers-month',
    imports: [],
    templateUrl: './new-customers-month.component.html',
    styleUrl: './new-customers-month.component.scss'
})
export class NewCustomersMonthComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}