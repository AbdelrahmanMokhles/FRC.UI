import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-checks-radios',
    imports: [RouterLink],
    templateUrl: './checks-radios.component.html',
    styleUrl: './checks-radios.component.scss'
})
export class ChecksRadiosComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}