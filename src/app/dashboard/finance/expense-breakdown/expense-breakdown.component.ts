import { Component } from '@angular/core';
import { ExpenseBreakdownService } from './expense-breakdown.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-expense-breakdown',
    imports: [],
    templateUrl: './expense-breakdown.component.html',
    styleUrl: './expense-breakdown.component.scss'
})
export class ExpenseBreakdownComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private expenseBreakdownService: ExpenseBreakdownService
    ) {}

    ngOnInit(): void {
        this.expenseBreakdownService.loadChart();
    }

}