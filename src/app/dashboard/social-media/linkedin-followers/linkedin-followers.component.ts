import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-linkedin-followers',
    imports: [],
    templateUrl: './linkedin-followers.component.html',
    styleUrl: './linkedin-followers.component.scss'
})
export class LinkedinFollowersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}