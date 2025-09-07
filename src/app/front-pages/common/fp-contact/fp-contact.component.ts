import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-fp-contact',
    imports: [],
    templateUrl: './fp-contact.component.html',
    styleUrl: './fp-contact.component.scss'
})
export class FpContactComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}