import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BitcoinService } from './bitcoin.service';
import { SolanaService } from './solana.service';
import { EthereumService } from './ethereum.service';
import { BinanceService } from './binance.service';
import { CardanoService } from './cardano.service';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-watchlist',
    imports: [CarouselModule],
    templateUrl: './watchlist.component.html',
    styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent {

    constructor(
        private bitcoinService: BitcoinService,
        private solanaService: SolanaService,
        private ethereumService: EthereumService,
        private cardanoService: CardanoService,
        private binanceService: BinanceService,
        public themeService: CustomizerSettingsService
    ) {}

    ngOnInit(): void {
        this.bitcoinService.loadChart();
        this.solanaService.loadChart();
        this.ethereumService.loadChart();
        this.binanceService.loadChart();
        this.cardanoService.loadChart();
    }

	// Owl Carousel
    cryptocurrencyWatchlistSlides: OwlOptions = {
		nav: true,
		margin: 10,
		loop: false,
		dots: false,
		autoplay: true,
		smartSpeed: 500,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>"
		],
        responsive: {
			0: {
				items: 1
			},
			505: {
				items: 2
			},
			665: {
				items: 2
			},
			890: {
				items: 3
			},
			1115: {
				items: 4
			}
		}
    }

}