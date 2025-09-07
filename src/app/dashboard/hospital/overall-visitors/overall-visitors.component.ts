import { Component } from '@angular/core';
import { OverallVisitorsService } from './overall-visitors.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-overall-visitors',
    imports: [],
    templateUrl: './overall-visitors.component.html',
    styleUrl: './overall-visitors.component.scss'
})
export class OverallVisitorsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private overallVisitorsService: OverallVisitorsService
    ) {}

    ngOnInit(): void {
        this.overallVisitorsService.loadChart();
    }

}