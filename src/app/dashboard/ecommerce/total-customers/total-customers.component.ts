import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TotalCustomersService } from './total-customers.service';

@Component({
    selector: 'app-total-customers',
    imports: [],
    templateUrl: './total-customers.component.html',
    styleUrl: './total-customers.component.scss'
})
export class TotalCustomersComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private totalCustomersService: TotalCustomersService
    ) {}

    ngOnInit(): void {
        this.totalCustomersService.loadChart();
    }

}