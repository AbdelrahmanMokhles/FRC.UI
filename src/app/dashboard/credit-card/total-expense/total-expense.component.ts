import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-expense',
    imports: [],
    templateUrl: './total-expense.component.html',
    styleUrl: './total-expense.component.scss'
})
export class TotalExpenseComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}