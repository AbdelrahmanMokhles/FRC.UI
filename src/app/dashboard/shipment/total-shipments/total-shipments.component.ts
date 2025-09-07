import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-shipments',
    imports: [],
    templateUrl: './total-shipments.component.html',
    styleUrl: './total-shipments.component.scss'
})
export class TotalShipmentsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}