import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-re-property-list',
    imports: [RouterLink],
    templateUrl: './re-property-list.component.html',
    styleUrl: './re-property-list.component.scss'
})
export class RePropertyListComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    // Card Header Menu
    activeDropdown: string | null = null; // Tracks the currently active dropdown
    toggleDropdown(dropdownKey: string) {
        this.activeDropdown = this.activeDropdown === dropdownKey ? null : dropdownKey;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-header-menu')) {
            this.activeDropdown = null; // Close any open dropdown
        }
    }

}