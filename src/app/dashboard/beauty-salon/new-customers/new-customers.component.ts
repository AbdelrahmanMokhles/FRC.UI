import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-new-customers',
    imports: [],
    templateUrl: './new-customers.component.html',
    styleUrl: './new-customers.component.scss'
})
export class NewCustomersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}