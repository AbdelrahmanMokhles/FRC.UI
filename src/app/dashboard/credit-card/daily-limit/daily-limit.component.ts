import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-daily-limit',
    imports: [],
    templateUrl: './daily-limit.component.html',
    styleUrl: './daily-limit.component.scss'
})
export class DailyLimitComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}