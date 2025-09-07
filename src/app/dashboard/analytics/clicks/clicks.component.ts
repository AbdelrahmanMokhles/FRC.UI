import { Component } from '@angular/core';
import { ClicksService } from './clicks.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-clicks',
    imports: [],
    templateUrl: './clicks.component.html',
    styleUrl: './clicks.component.scss'
})
export class ClicksComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private clicksService: ClicksService
    ) {}

    ngOnInit(): void {
        this.clicksService.loadChart();
    }

}