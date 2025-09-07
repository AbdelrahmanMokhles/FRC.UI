import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-cost-per-click',
    imports: [],
    templateUrl: './cost-per-click.component.html',
    styleUrl: './cost-per-click.component.scss'
})
export class CostPerClickComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}