import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-my-cards',
    imports: [],
    templateUrl: './my-cards.component.html',
    styleUrl: './my-cards.component.scss'
})
export class MyCardsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

}