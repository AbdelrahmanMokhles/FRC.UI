import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-income:not(0)',
    imports: [],
    templateUrl: './total-income.component.html',
    styleUrl: './total-income.component.scss'
})
export class TotalIncomeComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}