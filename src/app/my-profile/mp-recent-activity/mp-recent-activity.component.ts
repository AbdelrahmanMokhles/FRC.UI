import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-recent-activity',
    imports: [],
    templateUrl: './mp-recent-activity.component.html',
    styleUrl: './mp-recent-activity.component.scss'
})
export class MpRecentActivityComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}