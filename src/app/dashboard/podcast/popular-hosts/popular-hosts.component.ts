import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-popular-hosts',
    imports: [RouterLink],
    templateUrl: './popular-hosts.component.html',
    styleUrl: './popular-hosts.component.scss'
})
export class PopularHostsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}