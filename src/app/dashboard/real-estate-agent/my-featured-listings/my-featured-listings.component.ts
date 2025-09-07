import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-my-featured-listings',
    imports: [CarouselModule, RouterLink],
    templateUrl: './my-featured-listings.component.html',
    styleUrl: './my-featured-listings.component.scss'
})
export class MyFeaturedListingsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    // Owl Carousel
    myFeaturedListingsSlides: OwlOptions = {
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
            }
        }
    }

}