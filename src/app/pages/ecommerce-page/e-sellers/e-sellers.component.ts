import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-e-sellers',
    imports: [RouterLink],
    templateUrl: './e-sellers.component.html',
    styleUrl: './e-sellers.component.scss'
})
export class ESellersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}