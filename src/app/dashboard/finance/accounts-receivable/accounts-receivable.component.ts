import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-accounts-receivable',
    imports: [],
    templateUrl: './accounts-receivable.component.html',
    styleUrl: './accounts-receivable.component.scss'
})
export class AccountsReceivableComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}