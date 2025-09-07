import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { ExpenseService } from './expense.service';

@Component({
    selector: 'app-expense',
    imports: [],
    templateUrl: './expense.component.html',
    styleUrl: './expense.component.scss'
})
export class ExpenseComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private expenseService: ExpenseService
    ) {}

    ngOnInit(): void {
        this.expenseService.loadChart();
    }

}