import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-close-button',
    imports: [RouterLink],
    templateUrl: './close-button.component.html',
    styleUrl: './close-button.component.scss'
})
export class CloseButtonComponent {}