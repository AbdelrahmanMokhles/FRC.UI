import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-check-in',
    imports: [],
    templateUrl: './check-in.component.html',
    styleUrl: './check-in.component.scss'
})
export class CheckInComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}