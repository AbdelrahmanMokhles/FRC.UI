import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { PropertiesForRentService } from './properties-for-rent.service';

@Component({
    selector: 'app-properties-for-rent',
    imports: [],
    templateUrl: './properties-for-rent.component.html',
    styleUrl: './properties-for-rent.component.scss'
})
export class PropertiesForRentComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private propertiesForRentService: PropertiesForRentService
    ) {}

    ngOnInit(): void {
        this.propertiesForRentService.loadChart();
    }

}