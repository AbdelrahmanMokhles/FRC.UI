import { Component } from '@angular/core';
import { ReRevenueService } from './re-revenue.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-re-revenue',
    imports: [],
    templateUrl: './re-revenue.component.html',
    styleUrl: './re-revenue.component.scss'
})
export class ReRevenueComponent {

	constructor(
		public themeService: CustomizerSettingsService,
		private reRevenueService: ReRevenueService
	) {}

	ngOnInit(): void {
		this.reRevenueService.loadChart();
	}

}