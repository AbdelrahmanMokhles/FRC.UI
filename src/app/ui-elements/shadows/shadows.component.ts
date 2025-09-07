import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-shadows',
    imports: [RouterLink],
    templateUrl: './shadows.component.html',
    styleUrl: './shadows.component.scss'
})
export class ShadowsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}