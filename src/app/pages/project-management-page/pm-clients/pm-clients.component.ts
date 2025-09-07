import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-pm-clients',
    imports: [RouterLink],
    templateUrl: './pm-clients.component.html',
    styleUrl: './pm-clients.component.scss'
})
export class PmClientsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}