import { Component } from '@angular/core';
import { ConversionService } from './conversion.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-conversion',
    imports: [],
    templateUrl: './conversion.component.html',
    styleUrl: './conversion.component.scss'
})
export class ConversionComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private conversionService: ConversionService
    ) {}

    ngOnInit(): void {
        this.conversionService.loadChart();
    }

}