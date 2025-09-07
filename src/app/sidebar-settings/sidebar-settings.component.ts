import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-sidebar-settings',
    imports: [NgClass],
    templateUrl: './sidebar-settings.component.html',
    styleUrl: './sidebar-settings.component.scss'
})
export class SidebarSettingsComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    // Toggle Class
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

}