import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-profile-settings',
    imports: [RouterLink, FileUploadModule],
    templateUrl: './profile-settings.component.html',
    styleUrl: './profile-settings.component.scss'
})
export class ProfileSettingsComponent {

    // File Uploader
    public multiple: boolean = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}