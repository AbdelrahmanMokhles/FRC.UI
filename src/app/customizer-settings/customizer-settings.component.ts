import { Component } from '@angular/core';
import { CustomizerSettingsService } from './customizer-settings.service';
import { NgClass } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
    selector: 'app-customizer-settings',
    imports: [NgClass, NgScrollbarModule],
    templateUrl: './customizer-settings.component.html',
    styleUrl: './customizer-settings.component.scss'
})
export class CustomizerSettingsComponent {

    // isToggled
    isToggled = false;
    
    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Sidebar Dark
    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    // Right Sidebar
    toggleRightSidebarTheme() {
        this.themeService.toggleRightSidebarTheme();
    }

    // Hide Sidebar
    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    // Header Dark Mode
    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    // Card Bordered
    toggleCardBorderedTheme() {
        this.themeService.toggleCardBorderedTheme();
    }

    // Navbar
    toggleNavbarTheme() {
        this.themeService.toggleNavbarTheme();
    }

    // Card Without Border Radius
    toggleCardWithoutBorderRadiusTheme() {
        this.themeService.toggleCardWithoutBorderRadiusTheme();
    }

    // Card With Box Shadow
    toggleCardWithBoxShadowTheme() {
        this.themeService.toggleCardWithBoxShadowTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    // Body Bg Color
    toggleBodyBGTheme() {
        this.themeService.toggleBodyBGTheme();
    }

    // Settings Button Toggle
    toggle() {
        this.themeService.toggle();
    }

}