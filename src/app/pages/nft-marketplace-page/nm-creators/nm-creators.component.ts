import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-nm-creators',
    imports: [RouterLink],
    templateUrl: './nm-creators.component.html',
    styleUrl: './nm-creators.component.scss'
})
export class NmCreatorsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}