import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-lock-screen',
    imports: [NgClass,RouterLink],
    templateUrl: './suspension.component.html',
    styleUrl: './suspension.component.scss'
})
export class SuspensionComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

    // Password Show/Hide
    password: string = '';
    isPasswordVisible: boolean = false;
    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }
    onPasswordInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.password = inputElement.value;
    }

}