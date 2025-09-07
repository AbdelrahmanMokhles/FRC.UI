import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-top-channels',
    imports: [RouterLink],
    templateUrl: './top-channels.component.html',
    styleUrl: './top-channels.component.scss'
})
export class TopChannelsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}