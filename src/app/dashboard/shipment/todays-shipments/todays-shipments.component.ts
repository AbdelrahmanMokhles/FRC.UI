import { Component } from '@angular/core';
import { TodaysShipmentsService } from './todays-shipments.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-todays-shipments',
    imports: [],
    templateUrl: './todays-shipments.component.html',
    styleUrl: './todays-shipments.component.scss'
})
export class TodaysShipmentsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private todaysShipmentsService: TodaysShipmentsService
    ) {}

    ngOnInit(): void {
        this.todaysShipmentsService.loadChart();
    }

}