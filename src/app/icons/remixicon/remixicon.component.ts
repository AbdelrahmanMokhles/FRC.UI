import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-remixicon',
    imports: [RouterLink],
    templateUrl: './remixicon.component.html',
    styleUrl: './remixicon.component.scss'
})
export class RemixiconComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}