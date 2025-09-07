import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-new-bookings',
    imports: [],
    templateUrl: './new-bookings.component.html',
    styleUrl: './new-bookings.component.scss'
})
export class NewBookingsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}