import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-color-background',
    imports: [RouterLink],
    templateUrl: './color-background.component.html',
    styleUrl: './color-background.component.scss'
})
export class ColorBackgroundComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}