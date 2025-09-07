import { Component } from '@angular/core';
import { SessionsService } from './sessions.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-sessions',
    imports: [],
    templateUrl: './sessions.component.html',
    styleUrl: './sessions.component.scss'
})
export class SessionsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private sessionsService: SessionsService
    ) {}

    ngOnInit(): void {
        this.sessionsService.loadChart();
    }

}