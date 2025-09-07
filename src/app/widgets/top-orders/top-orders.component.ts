import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { TopOrdersService } from './top-orders.service';

@Component({
    selector: 'app-top-orders',
    imports: [],
    templateUrl: './top-orders.component.html',
    styleUrl: './top-orders.component.scss'
})
export class TopOrdersComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private topOrdersService: TopOrdersService
    ) {}

    ngOnInit(): void {
        this.topOrdersService.loadChart();
    }

}