import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-cost-per-thousand',
    imports: [],
    templateUrl: './cost-per-thousand.component.html',
    styleUrl: './cost-per-thousand.component.scss'
})
export class CostPerThousandComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}