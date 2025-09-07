import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RealtimeActiveUsersService } from './realtime-active-users.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-realtime-active-users',
    imports: [RouterLink],
    templateUrl: './realtime-active-users.component.html',
    styleUrl: './realtime-active-users.component.scss'
})
export class RealtimeActiveUsersComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private realtimeActiveUsersService: RealtimeActiveUsersService
    ) {}

    ngOnInit(): void {
        this.realtimeActiveUsersService.loadChart();
    }

}