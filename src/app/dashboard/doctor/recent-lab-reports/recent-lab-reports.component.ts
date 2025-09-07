import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-recent-lab-reports',
    imports: [],
    templateUrl: './recent-lab-reports.component.html',
    styleUrl: './recent-lab-reports.component.scss'
})
export class RecentLabReportsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}