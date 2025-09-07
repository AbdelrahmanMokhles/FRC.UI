import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-properties-by-country',
    imports: [],
    templateUrl: './properties-by-country.component.html',
    styleUrl: './properties-by-country.component.scss'
})
export class PropertiesByCountryComponent {

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