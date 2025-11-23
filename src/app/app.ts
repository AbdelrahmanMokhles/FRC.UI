import { Component, signal } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { SidebarSettingsComponent } from './sidebar-settings/sidebar-settings.component';
import { ToastComponent } from './common/toast-component/toast-component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, SidebarSettingsComponent, ToastComponent],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {

    protected readonly title = signal('FIBERME');

    private previousUrl: string | null = null;

    constructor(
        public router: Router,
        private viewportScroller: ViewportScroller
    ) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                const currentUrl = event.urlAfterRedirects;
                // Scroll to top ONLY if navigating to a different route (not on refresh)
                if (this.previousUrl && this.previousUrl !== currentUrl) {
                    this.viewportScroller.scrollToPosition([0, 0]);
                }
                this.previousUrl = currentUrl;
            }
        });
    }

}