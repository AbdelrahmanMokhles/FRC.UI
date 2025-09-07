import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-enrolled:not(1)',
    imports: [],
    templateUrl: './total-enrolled.component.html',
    styleUrl: './total-enrolled.component.scss'
})
export class TotalEnrolledComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}