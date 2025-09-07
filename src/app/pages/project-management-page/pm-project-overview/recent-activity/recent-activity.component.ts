import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-recent-activity',
    imports: [],
    templateUrl: './recent-activity.component.html',
    styleUrl: './recent-activity.component.scss'
})
export class RecentActivityComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}