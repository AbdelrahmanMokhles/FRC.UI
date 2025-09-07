import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-click-through-rate',
    imports: [],
    templateUrl: './click-through-rate.component.html',
    styleUrl: './click-through-rate.component.scss'
})
export class ClickThroughRateComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}