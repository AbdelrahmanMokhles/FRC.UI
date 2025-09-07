import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-course-instructor',
    imports: [],
    templateUrl: './course-instructor.component.html',
    styleUrl: './course-instructor.component.scss'
})
export class CourseInstructorComponent {

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}