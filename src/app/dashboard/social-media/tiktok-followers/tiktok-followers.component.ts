import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-tiktok-followers',
    imports: [],
    templateUrl: './tiktok-followers.component.html',
    styleUrl: './tiktok-followers.component.scss'
})
export class TiktokFollowersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}