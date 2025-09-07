import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-style-2',
    imports: [],
    templateUrl: './style-2.component.html',
    styleUrl: './style-2.component.scss'
})
export class Style2Component {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}