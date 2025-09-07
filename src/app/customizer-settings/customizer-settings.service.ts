import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomizerSettingsService {
    
    constructor() {
        if (this.isBrowser()) {
            // Dark Mode
            this.isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme')!) || false;
            this.updateDarkBodyClass();

            // Sidebar Dark Mode
            this.isSidebarDarkTheme = JSON.parse(localStorage.getItem('isSidebarDarkTheme')!);

            // Right Sidebar
            this.isRightSidebarTheme = JSON.parse(localStorage.getItem('isRightSidebarTheme')!);

            // Hide Sidebar
            this.isHideSidebarTheme = JSON.parse(localStorage.getItem('isHideSidebarTheme')!);

            // Header Dark
            this.isHeaderDarkTheme = JSON.parse(localStorage.getItem('isHeaderDarkTheme')!);

            // Card Bordered
            this.isCardBorderedTheme = JSON.parse(localStorage.getItem('isCardBorderedTheme')!);

            // Navbar
            this.isNavbarTheme = JSON.parse(localStorage.getItem('isNavbarTheme')!);

            // Card Without Border Radius
            this.isCardWithoutBorderRadiusTheme = JSON.parse(localStorage.getItem('isCardWithoutBorderRadiusTheme')!);

            // Card With Box Shadow
            this.isCardWithBoxShadowTheme = JSON.parse(localStorage.getItem('isCardWithBoxShadowTheme')!);

            // RTL Mode
            this.isRTLEnabledTheme = JSON.parse(localStorage.getItem('isRTLEnabledTheme')!) || false;
            this.updateRTLBodyClass();

            // Body BG Color
            this.isBodyBGTheme = JSON.parse(localStorage.getItem('isBodyBGTheme')!) || false;
            this.updateBodyBGBodyClass();
        }
    }

    // Check if code is running in the browser
    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof document !== 'undefined';
    }

    // Dark Mode
    private isDarkTheme!: boolean;
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        if (this.isBrowser()) {
            localStorage.setItem('isDarkTheme', JSON.stringify(this.isDarkTheme));
            this.updateDarkBodyClass();
        }
    }
    isDark() {
        return this.isDarkTheme;
    }
    private updateDarkBodyClass() {
        if (this.isBrowser()) {
            if (this.isDarkTheme) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    }

    // Sidebar Dark
    private isSidebarDarkTheme!: boolean;
    toggleSidebarTheme() {
        this.isSidebarDarkTheme = !this.isSidebarDarkTheme;
        localStorage.setItem('isSidebarDarkTheme', JSON.stringify(this.isSidebarDarkTheme));
    }
    isSidebarDark() {
        return this.isSidebarDarkTheme;
    }

    // Right Sidebar
    private isRightSidebarTheme!: boolean;
    toggleRightSidebarTheme() {
        this.isRightSidebarTheme = !this.isRightSidebarTheme;
        localStorage.setItem('isRightSidebarTheme', JSON.stringify(this.isRightSidebarTheme));
    }
    isRightSidebar() {
        return this.isRightSidebarTheme;
    }

    // Hide Sidebar
    private isHideSidebarTheme!: boolean;
    toggleHideSidebarTheme() {
        this.isHideSidebarTheme = !this.isHideSidebarTheme;
        localStorage.setItem('isHideSidebarTheme', JSON.stringify(this.isHideSidebarTheme));
    }
    isHideSidebar() {
        return this.isHideSidebarTheme;
    }

    // Header Dark Mode
    private isHeaderDarkTheme!: boolean;
    toggleHeaderTheme() {
        this.isHeaderDarkTheme = !this.isHeaderDarkTheme;
        localStorage.setItem('isHeaderDarkTheme', JSON.stringify(this.isHeaderDarkTheme));
    }
    isHeaderDark() {
        return this.isHeaderDarkTheme;
    }

    // Card Bordered
    private isCardBorderedTheme!: boolean;
    toggleCardBorderedTheme() {
        this.isCardBorderedTheme = !this.isCardBorderedTheme;
        localStorage.setItem('isCardBorderedTheme', JSON.stringify(this.isCardBorderedTheme));
    }
    isCardBordered() {
        return this.isCardBorderedTheme;
    }

    // Navbar
    private isNavbarTheme!: boolean;
    toggleNavbarTheme() {
        this.isNavbarTheme = !this.isNavbarTheme;
        localStorage.setItem('isNavbarTheme', JSON.stringify(this.isNavbarTheme));
    }
    isNavbar() {
        return this.isNavbarTheme;
    }

    // Card Without Border Radius
    private isCardWithoutBorderRadiusTheme!: boolean;
    toggleCardWithoutBorderRadiusTheme() {
        this.isCardWithoutBorderRadiusTheme = !this.isCardWithoutBorderRadiusTheme;
        localStorage.setItem('isCardWithoutBorderRadiusTheme', JSON.stringify(this.isCardWithoutBorderRadiusTheme));
    }
    isCardWithoutBorderRadius() {
        return this.isCardWithoutBorderRadiusTheme;
    }

    // Card With Box Shadow
    private isCardWithBoxShadowTheme!: boolean;
    toggleCardWithBoxShadowTheme() {
        this.isCardWithBoxShadowTheme = !this.isCardWithBoxShadowTheme;
        localStorage.setItem('isCardWithBoxShadowTheme', JSON.stringify(this.isCardWithBoxShadowTheme));
    }
    isCardWithBoxShadow() {
        return this.isCardWithBoxShadowTheme;
    }

    // RTL Mode
    private isRTLEnabledTheme!: boolean;
    toggleRTLEnabledTheme() {
        this.isRTLEnabledTheme = !this.isRTLEnabledTheme;
        if (this.isBrowser()) {
            localStorage.setItem('isRTLEnabledTheme', JSON.stringify(this.isRTLEnabledTheme));
            this.updateRTLBodyClass();
        }
    }
    isRTLEnabled() {
        return this.isRTLEnabledTheme;
    }
    private updateRTLBodyClass() {
        if (this.isBrowser()) {
            if (this.isRTLEnabledTheme) {
                document.body.classList.add('rtl-enabled');
            } else {
                document.body.classList.remove('rtl-enabled');
            }
        }
    }

    // Body BG Color
    private isBodyBGTheme!: boolean;
    toggleBodyBGTheme() {
        this.isBodyBGTheme = !this.isBodyBGTheme;
        if (this.isBrowser()) {
            localStorage.setItem('isBodyBGTheme', JSON.stringify(this.isBodyBGTheme));
            this.updateBodyBGBodyClass();
        }
    }
    isBodyBG() {
        return this.isBodyBGTheme;
    }
    private updateBodyBGBodyClass() {
        if (this.isBrowser()) {
            if (this.isBodyBGTheme) {
                document.body.classList.add('body-bg-color');
            } else {
                document.body.classList.remove('body-bg-color');
            }
        }
    }

    // isToggled
    private isToggled = new BehaviorSubject<boolean>(false);
    get isToggled$() {
        return this.isToggled.asObservable();
    }
    toggle() {
        this.isToggled.next(!this.isToggled.value);
    }
    
}