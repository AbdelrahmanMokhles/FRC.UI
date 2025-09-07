import { Component } from '@angular/core';
import { GrossEarningsService } from './gross-earnings.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-gross-earnings',
    imports: [],
    templateUrl: './gross-earnings.component.html',
    styleUrl: './gross-earnings.component.scss'
})
export class GrossEarningsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private grossEarningsService: GrossEarningsService
    ) {}

    ngOnInit(): void {
        this.grossEarningsService.loadChart();
    }

}