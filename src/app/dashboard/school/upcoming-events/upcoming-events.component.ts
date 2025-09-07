import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-upcoming-events',
    imports: [CarouselModule, RouterLink],
    templateUrl: './upcoming-events.component.html',
    styleUrl: './upcoming-events.component.scss'
})
export class UpcomingEventsComponent {

    // Owl Carousel
    upcomingEventsSlides: OwlOptions = {
        items: 1,
		nav: false,
		loop: true,
		dots: true,
		autoplay: true,
		smartSpeed: 500,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-line'></i>",
			"<i class='ri-arrow-right-line'></i>"
		]
    }

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}