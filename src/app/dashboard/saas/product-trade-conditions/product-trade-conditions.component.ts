import { Component, HostListener } from '@angular/core';
import { ProductTradeConditionsService } from './product-trade-conditions.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-product-trade-conditions',
    imports: [],
    templateUrl: './product-trade-conditions.component.html',
    styleUrl: './product-trade-conditions.component.scss'
})
export class ProductTradeConditionsComponent {

    constructor(
        public themeService: CustomizerSettingsService,
        private productTradeConditionsService: ProductTradeConditionsService
    ) {}

    ngOnInit(): void {
        this.productTradeConditionsService.loadChart();
    }
    
    // Card Header Menu
    isCardHeaderOpen = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-header-menu')) {
            this.isCardHeaderOpen = false;
        }
    }

}