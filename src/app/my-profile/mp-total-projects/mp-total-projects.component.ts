import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-mp-total-projects',
    imports: [],
    templateUrl: './mp-total-projects.component.html',
    styleUrl: './mp-total-projects.component.scss'
})
export class MpTotalProjectsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}