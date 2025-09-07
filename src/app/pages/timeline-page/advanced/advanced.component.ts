import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-advanced',
    imports: [],
    templateUrl: './advanced.component.html',
    styleUrl: './advanced.component.scss'
})
export class AdvancedComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}