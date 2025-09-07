import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-offcanvas',
    imports: [RouterLink],
    templateUrl: './offcanvas.component.html',
    styleUrl: './offcanvas.component.scss'
})
export class OffcanvasComponent {
    
    // Modal Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }
    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

}