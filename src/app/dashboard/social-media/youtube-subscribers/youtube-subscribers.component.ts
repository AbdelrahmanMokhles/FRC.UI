import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-youtube-subscribers',
    imports: [],
    templateUrl: './youtube-subscribers.component.html',
    styleUrl: './youtube-subscribers.component.scss'
})
export class YoutubeSubscribersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}