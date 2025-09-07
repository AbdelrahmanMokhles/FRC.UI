import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-primary-emails',
    imports: [RouterLink],
    templateUrl: './primary-emails.component.html',
    styleUrl: './primary-emails.component.scss'
})
export class PrimaryEmailsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}