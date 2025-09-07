import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-quick-transfer',
    imports: [],
    templateUrl: './quick-transfer.component.html',
    styleUrl: './quick-transfer.component.scss'
})
export class QuickTransferComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}
    
}