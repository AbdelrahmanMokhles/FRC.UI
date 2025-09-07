import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-p-teams',
    imports: [RouterLink],
    templateUrl: './p-teams.component.html',
    styleUrl: './p-teams.component.scss'
})
export class PTeamsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}