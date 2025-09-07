import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-create-invoice',
    imports: [RouterLink],
    templateUrl: './create-invoice.component.html',
    styleUrl: './create-invoice.component.scss'
})
export class CreateInvoiceComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}