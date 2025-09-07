import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-check-out',
    imports: [],
    templateUrl: './check-out.component.html',
    styleUrl: './check-out.component.scss'
})
export class CheckOutComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}