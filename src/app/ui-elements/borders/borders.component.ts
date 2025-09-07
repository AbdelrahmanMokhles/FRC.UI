import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-borders',
    imports: [RouterLink],
    templateUrl: './borders.component.html',
    styleUrl: './borders.component.scss'
})
export class BordersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}