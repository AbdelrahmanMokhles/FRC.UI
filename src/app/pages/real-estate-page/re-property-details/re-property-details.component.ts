import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-re-property-details',
    imports: [RouterLink],
    templateUrl: './re-property-details.component.html',
    styleUrl: './re-property-details.component.scss'
})
export class RePropertyDetailsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}