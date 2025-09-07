import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-order-tracking',
    imports: [RouterLink],
    templateUrl: './e-order-tracking.component.html',
    styleUrl: './e-order-tracking.component.scss'
})
export class EOrderTrackingComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}