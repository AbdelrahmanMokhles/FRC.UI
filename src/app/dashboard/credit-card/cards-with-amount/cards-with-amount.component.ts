import { Component } from '@angular/core';
import { CardsWithAmountService } from './cards-with-amount.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-cards-with-amount',
    imports: [],
    templateUrl: './cards-with-amount.component.html',
    styleUrl: './cards-with-amount.component.scss'
})
export class CardsWithAmountComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private cardsWithAmountService: CardsWithAmountService
    ) {}

    ngOnInit(): void {
        this.cardsWithAmountService.loadChart();
    }

}