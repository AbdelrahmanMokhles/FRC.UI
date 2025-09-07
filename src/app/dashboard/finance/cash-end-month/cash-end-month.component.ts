import { Component } from '@angular/core';
import { CashEndMonthService } from './cash-end-month.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-cash-end-month',
    imports: [],
    templateUrl: './cash-end-month.component.html',
    styleUrl: './cash-end-month.component.scss'
})
export class CashEndMonthComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private cashEndMonthService: CashEndMonthService
    ) {}

    ngOnInit(): void {
        this.cashEndMonthService.loadChart();
    }

}