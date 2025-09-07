import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-external-links',
    imports: [],
    templateUrl: './external-links.component.html',
    styleUrl: './external-links.component.scss'
})
export class ExternalLinksComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}