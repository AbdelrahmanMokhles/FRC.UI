import { Component } from '@angular/core';
import { TotalUsersService } from './total-users.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-total-users',
    imports: [],
    templateUrl: './total-users.component.html',
    styleUrl: './total-users.component.scss'
})
export class TotalUsersComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private totalUsersService: TotalUsersService
    ) {}

    ngOnInit(): void {
        this.totalUsersService.loadChart();
    }

}