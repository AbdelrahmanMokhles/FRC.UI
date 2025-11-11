import { Component } from '@angular/core';
import {
    ActivatedRoute,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
} from '@angular/router';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-settings',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
})
export class SettingsComponent {
    UserType: 'Admin' | 'User' | null = null;
    constructor(
        public themeService: CustomizerSettingsService,
        private _route: ActivatedRoute
    ) {}

    Change() {}
}
