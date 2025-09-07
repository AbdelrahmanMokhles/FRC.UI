import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-style-3',
    imports: [],
    templateUrl: './style-3.component.html',
    styleUrl: './style-3.component.scss'
})
export class Style3Component {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}