import { Component } from '@angular/core';
import { CriticalPatientsService } from './critical-patients.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-critical-patients',
    imports: [],
    templateUrl: './critical-patients.component.html',
    styleUrl: './critical-patients.component.scss'
})
export class CriticalPatientsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private criticalPatientsService: CriticalPatientsService
    ) {}

    ngOnInit(): void {
        this.criticalPatientsService.loadChart();
    }

}