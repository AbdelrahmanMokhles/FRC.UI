import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-product-development',
    imports: [],
    templateUrl: './product-development.component.html',
    styleUrl: './product-development.component.scss'
})
export class ProductDevelopmentComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}