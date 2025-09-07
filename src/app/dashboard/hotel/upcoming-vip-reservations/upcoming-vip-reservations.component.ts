import { RouterLink } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-upcoming-vip-reservations',
    imports: [RouterLink],
    templateUrl: './upcoming-vip-reservations.component.html',
    styleUrl: './upcoming-vip-reservations.component.scss'
})
export class UpcomingVipReservationsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}
    
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