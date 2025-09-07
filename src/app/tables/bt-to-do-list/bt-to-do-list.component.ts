import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-bt-to-do-list',
    imports: [RouterLink],
    templateUrl: './bt-to-do-list.component.html',
    styleUrl: './bt-to-do-list.component.scss'
})
export class BtToDoListComponent {

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}