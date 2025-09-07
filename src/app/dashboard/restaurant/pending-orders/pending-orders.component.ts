import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { PendingOrdersService } from './pending-orders.service';

@Component({
    selector: 'app-pending-orders',
    imports: [],
    templateUrl: './pending-orders.component.html',
    styleUrl: './pending-orders.component.scss'
})
export class PendingOrdersComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private pendingOrdersService: PendingOrdersService
    ) {}

    ngOnInit(): void {
        this.pendingOrdersService.loadChart();
    }

}