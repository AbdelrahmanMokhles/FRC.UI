import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { EmployeeAttendanceTrendsService } from './employee-attendance-trends.service';


@Component({
    selector: 'app-employee-attendance-trends',
    imports: [],
    templateUrl: './employee-attendance-trends.component.html',
    styleUrl: './employee-attendance-trends.component.scss'
})
export class EmployeeAttendanceTrendsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private employeeAttendanceTrendsService: EmployeeAttendanceTrendsService
    ) {}

    ngOnInit(): void {
        this.employeeAttendanceTrendsService.loadChart();
    }

}