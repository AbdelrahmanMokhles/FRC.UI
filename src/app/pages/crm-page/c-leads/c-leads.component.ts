import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@Component({
    selector: 'app-c-leads',
    imports: [RouterLink, FileUploadModule],
    templateUrl: './c-leads.component.html',
    styleUrl: './c-leads.component.scss'
})
export class CLeadsComponent {

    // New Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    // Edit Popup Trigger
    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

}