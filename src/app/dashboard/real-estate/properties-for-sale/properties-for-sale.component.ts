import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { PropertiesForSaleService } from './properties-for-sale.service';

@Component({
    selector: 'app-properties-for-sale',
    imports: [],
    templateUrl: './properties-for-sale.component.html',
    styleUrl: './properties-for-sale.component.scss'
})
export class PropertiesForSaleComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private propertiesForSaleService: PropertiesForSaleService
    ) {}

    ngOnInit(): void {
        this.propertiesForSaleService.loadChart();
    }

}