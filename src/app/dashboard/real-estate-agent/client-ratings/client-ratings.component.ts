import { Component, HostListener } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-client-ratings',
    imports: [CarouselModule],
    templateUrl: './client-ratings.component.html',
    styleUrl: './client-ratings.component.scss'
})
export class ClientRatingsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}
    
    // Owl Carousel
    clientRatingsSlides: OwlOptions = {
        nav: false,
        loop: true,
        dots: true,
        margin: 25,
        autoplay: true,
        smartSpeed: 500,
        autoplayHoverPause: true,
        navText: [
            "<i class='ri-arrow-left-line'></i>",
            "<i class='ri-arrow-right-line'></i>"
        ],
        responsive: {
            0: {
                items: 1
            },
            506: {
                items: 2
            },
            668: {
                items: 2
            },
            924: {
                items: 3
            }
        }
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