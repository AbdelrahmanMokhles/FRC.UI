import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-expenses:not(0)',
    imports: [],
    templateUrl: './total-expenses.component.html',
    styleUrl: './total-expenses.component.scss'
})
export class TotalExpensesComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}