import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-spinners',
    imports: [RouterLink],
    templateUrl: './spinners.component.html',
    styleUrl: './spinners.component.scss'
})
export class SpinnersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}