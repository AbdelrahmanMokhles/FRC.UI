import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-accounts-payable',
    imports: [],
    templateUrl: './accounts-payable.component.html',
    styleUrl: './accounts-payable.component.scss'
})
export class AccountsPayableComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}