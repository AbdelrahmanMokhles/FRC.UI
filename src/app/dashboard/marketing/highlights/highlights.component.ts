import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-highlights',
    imports: [],
    templateUrl: './highlights.component.html',
    styleUrl: './highlights.component.scss'
})
export class HighlightsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}