import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-crypto-market-cap',
    imports: [],
    templateUrl: './crypto-market-cap.component.html',
    styleUrl: './crypto-market-cap.component.scss'
})
export class CryptoMarketCapComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}