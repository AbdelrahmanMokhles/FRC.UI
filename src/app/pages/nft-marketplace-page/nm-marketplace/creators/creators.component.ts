import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-creators',
    imports: [RouterLink],
    templateUrl: './creators.component.html',
    styleUrl: './creators.component.scss'
})
export class CreatorsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}