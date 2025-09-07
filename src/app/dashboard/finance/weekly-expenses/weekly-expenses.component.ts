import { Component } from '@angular/core';
import { WeeklyExpensesService } from './weekly-expenses.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-weekly-expenses',
    imports: [],
    templateUrl: './weekly-expenses.component.html',
    styleUrl: './weekly-expenses.component.scss'
})
export class WeeklyExpensesComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private weeklyExpensesService: WeeklyExpensesService
    ) {}

    ngOnInit(): void {
        this.weeklyExpensesService.loadChart();
    }

}