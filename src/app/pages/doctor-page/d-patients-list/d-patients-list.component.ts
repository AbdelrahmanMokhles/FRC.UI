import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-d-patients-list',
    imports: [RouterLink],
    templateUrl: './d-patients-list.component.html',
    styleUrl: './d-patients-list.component.scss'
})
export class DPatientsListComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}