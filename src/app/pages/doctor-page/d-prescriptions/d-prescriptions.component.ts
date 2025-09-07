import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-d-prescriptions',
    imports: [RouterLink],
    templateUrl: './d-prescriptions.component.html',
    styleUrl: './d-prescriptions.component.scss'
})
export class DPrescriptionsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}