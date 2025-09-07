import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-top-stylist-performance',
    imports: [],
    templateUrl: './top-stylist-performance.component.html',
    styleUrl: './top-stylist-performance.component.scss'
})
export class TopStylistPerformanceComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}