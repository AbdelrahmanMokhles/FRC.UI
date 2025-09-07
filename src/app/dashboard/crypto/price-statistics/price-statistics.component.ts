import { Component, HostListener } from '@angular/core';
import { PriceStatisticsService } from './price-statistics.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-price-statistics',
    imports: [],
    templateUrl: './price-statistics.component.html',
    styleUrl: './price-statistics.component.scss'
})
export class PriceStatisticsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private priceStatisticsService: PriceStatisticsService
    ) {}

    ngOnInit(): void {
        this.priceStatisticsService.loadChart();
    }

    // Card Header Menu
    isCardHeaderOpen = false;
    isCryptocurrencyTypesOpen = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    toggleCryptocurrencyTypesMenu() {
        this.isCryptocurrencyTypesOpen = !this.isCryptocurrencyTypesOpen;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-header-menu')) {
            this.isCardHeaderOpen = false;
        }
        if (!target.closest('.cryptocurrency-types')) {
            this.isCryptocurrencyTypesOpen = false;
        }
    }

}