import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-edit-invoice',
    imports: [RouterLink],
    templateUrl: './edit-invoice.component.html',
    styleUrl: './edit-invoice.component.scss'
})
export class EditInvoiceComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}