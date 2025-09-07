import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-instagram-followers',
    imports: [],
    templateUrl: './instagram-followers.component.html',
    styleUrl: './instagram-followers.component.scss'
})
export class InstagramFollowersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}