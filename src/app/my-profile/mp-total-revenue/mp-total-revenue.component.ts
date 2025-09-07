import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-total-revenue',
    imports: [],
    templateUrl: './mp-total-revenue.component.html',
    styleUrl: './mp-total-revenue.component.scss'
})
export class MpTotalRevenueComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}