import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-top-podcasters',
    imports: [RouterLink],
    templateUrl: './top-podcasters.component.html',
    styleUrl: './top-podcasters.component.scss'
})
export class TopPodcastersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}