import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-congratulations',
    imports: [RouterLink],
    templateUrl: './congratulations.component.html',
    styleUrl: './congratulations.component.scss'
})
export class CongratulationsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}