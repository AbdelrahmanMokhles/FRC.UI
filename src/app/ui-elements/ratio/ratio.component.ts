import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-ratio',
    imports: [RouterLink],
    templateUrl: './ratio.component.html',
    styleUrl: './ratio.component.scss'
})
export class RatioComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}