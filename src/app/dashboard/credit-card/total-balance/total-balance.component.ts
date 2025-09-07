import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-balance',
    imports: [],
    templateUrl: './total-balance.component.html',
    styleUrl: './total-balance.component.scss'
})
export class TotalBalanceComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}