import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-x-followers',
    imports: [],
    templateUrl: './x-followers.component.html',
    styleUrl: './x-followers.component.scss'
})
export class XFollowersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}