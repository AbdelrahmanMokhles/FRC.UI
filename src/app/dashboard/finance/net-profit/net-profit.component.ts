import { Component } from '@angular/core';
import { NetProfitService } from './net-profit.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-net-profit',
    imports: [],
    templateUrl: './net-profit.component.html',
    styleUrl: './net-profit.component.scss'
})
export class NetProfitComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private netProfitService: NetProfitService
    ) {}

    ngOnInit(): void {
        this.netProfitService.loadChart();
    }

}