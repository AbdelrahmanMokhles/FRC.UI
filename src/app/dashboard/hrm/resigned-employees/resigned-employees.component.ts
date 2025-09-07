import { Component } from '@angular/core';
import { ResignedEmployeesService } from './resigned-employees.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-resigned-employees',
    imports: [],
    templateUrl: './resigned-employees.component.html',
    styleUrl: './resigned-employees.component.scss'
})
export class ResignedEmployeesComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private resignedEmployeesService: ResignedEmployeesService
    ) {}

    ngOnInit(): void {
        this.resignedEmployeesService.loadChart();
    }

}