import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, NavigationEnd, Router } from '@angular/router';
import { ToggleService } from './toggle.service';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './navbar/navbar.component';
import { UserService } from '../../Services/authentication/UserService/user-service';

@Component({
    selector: 'app-header',
    imports: [RouterLink, NgClass, NavbarComponent,CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {

    user:any;
    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;
    isBrowser : boolean;

    constructor(
        private _userService : UserService,
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router
    ) {

        this.isBrowser = isPlatformBrowser(this.platformId);
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        // Subscribe to router events to toggle the sidebar on navigation
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            // Check if the sidebar is currently toggled and if so, toggle it
            if (this.isSidebarToggled) {
                this.toggleService.toggle(); // Close the sidebar if it's open
            }
        });
        if(this.isBrowser){
            const tokk = localStorage.getItem("token");
            // this.token = tokk;
            // console.log(this.token);
            this._userService.Profile({token : tokk}).subscribe({
                next : (res)=>{
                    this.user = res.body;
                    console.log(this.user);
                },
                error:(res) =>{
                    console.log(res);
                }
            });
        }
    }

    // Burger Menu Toggle
    toggle() {
        this.toggleService.toggle();
    }

    // Settings Button Toggle
    settingsButtonToggle() {
        this.themeService.toggle();
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    Logout(){
        localStorage.removeItem('token');
    }

    // Header Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll')
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    // Dropdown Menu
    isConnectedAppsDropdownOpen = false;
    isLanguageDropdownOpen = false;
    isNotificationsDropdownOpen = false;
    isProfileDropdownOpen = false;
    toggleConnectedAppsDropdown() {
        this.isConnectedAppsDropdownOpen = !this.isConnectedAppsDropdownOpen;
    }
    toggleLanguageDropdown() {
        this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    }
    toggleNotificationsDropdown() {
        this.isNotificationsDropdownOpen = !this.isNotificationsDropdownOpen;
    }
    toggleProfileDropdown() {
        this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.connected-apps-menu')) {
            this.isConnectedAppsDropdownOpen = false;
        }
        if (!target.closest('.language-menu')) {
            this.isLanguageDropdownOpen = false;
        }
        if (!target.closest('.notifications-menu')) {
            this.isNotificationsDropdownOpen = false;
        }
        if (!target.closest('.profile-menu')) {
            this.isProfileDropdownOpen = false;
        }
    }

    // Fullscreen
    isFullscreen: boolean = false;
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            // Only add event listeners if the platform is the browser
            document.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
            document.addEventListener('webkitfullscreenchange', this.onFullscreenChange.bind(this));
            document.addEventListener('mozfullscreenchange', this.onFullscreenChange.bind(this));
            document.addEventListener('MSFullscreenChange', this.onFullscreenChange.bind(this));
        }
    }
    toggleFullscreen() {
        if (this.isFullscreen) {
            this.closeFullscreen();
        } else {
            this.openFullscreen();
        }
    }
    openFullscreen() {
        if (isPlatformBrowser(this.platformId)) {
            const element = document.documentElement as HTMLElement & {
                mozRequestFullScreen?: () => Promise<void>;
                webkitRequestFullscreen?: () => Promise<void>;
                msRequestFullscreen?: () => Promise<void>;
            };
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) { // IE/Edge
                element.msRequestFullscreen();
            }
        }
    }
    closeFullscreen() {
        if (isPlatformBrowser(this.platformId)) {
            const doc = document as Document & {
                mozCancelFullScreen?: () => Promise<void>;
                webkitExitFullscreen?: () => Promise<void>;
                msExitFullscreen?: () => Promise<void>;
            };
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (doc.mozCancelFullScreen) { // Firefox
                doc.mozCancelFullScreen();
            } else if (doc.webkitExitFullscreen) { // Chrome, Safari, and Opera
                doc.webkitExitFullscreen();
            } else if (doc.msExitFullscreen) { // IE/Edge
                doc.msExitFullscreen();
            }
        }
    }
    onFullscreenChange() {
        if (isPlatformBrowser(this.platformId)) {
            const doc = document as Document & {
                webkitFullscreenElement?: Element;
                mozFullScreenElement?: Element;
                msFullscreenElement?: Element;
            };
            this.isFullscreen = !!(document.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);
        }
    }

}