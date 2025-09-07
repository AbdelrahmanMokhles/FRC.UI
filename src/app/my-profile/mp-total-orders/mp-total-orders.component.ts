import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-total-orders',
    imports: [],
    templateUrl: './mp-total-orders.component.html',
    styleUrl: './mp-total-orders.component.scss'
})
export class MpTotalOrdersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}