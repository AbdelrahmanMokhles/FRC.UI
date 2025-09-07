import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-facebook-followers',
    imports: [],
    templateUrl: './facebook-followers.component.html',
    styleUrl: './facebook-followers.component.scss'
})
export class FacebookFollowersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}