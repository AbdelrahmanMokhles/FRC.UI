import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-teachers',
    imports: [RouterLink],
    templateUrl: './teachers.component.html',
    styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}