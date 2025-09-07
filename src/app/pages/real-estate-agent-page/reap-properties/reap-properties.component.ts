import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@Component({
    selector: 'app-reap-properties',
    imports: [RouterLink, FileUploadModule],
    templateUrl: './reap-properties.component.html',
    styleUrl: './reap-properties.component.scss'
})
export class ReapPropertiesComponent {

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

}