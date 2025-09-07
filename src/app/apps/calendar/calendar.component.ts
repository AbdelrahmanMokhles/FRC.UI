import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { WorkingScheduleComponent } from './working-schedule/working-schedule.component';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-calendar',
    imports: [RouterLink, FullCalendarModule, WorkingScheduleComponent],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

    // Calendar
    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        dayMaxEvents: true, // when too many events in a day, show the popover
        weekends: true,
        events: [
            {
                title: 'Annual Conference 2025',
                date: '2025-01-01'
            },
            {
                title: 'Product Lunch Webinar 2025 & Meet With Trezo Angular',
                start: '2025-01-02',
                end: '2025-01-04'
            },
            {
                title: 'Tech Summit 2025',
                date: '2025-01-14'
            },
            {
                title: 'Web Development Seminar',
                date: '2025-01-17'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2025-01-26'
            },
            {
                title: 'Meeting with Developers',
                date: '2025-01-30'
            },
            {
                title: 'Annual Conference 2025',
                date: '2025-02-10'
            },
            {
                title: 'Product Lunch Webinar 2025 & Meet With Trezo Angular',
                start: '2025-02-14',
                end: '2025-02-16'
            },
            {
                title: 'Tech Summit 2025',
                date: '2025-02-24'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2025-02-26'
            },
            {
                title: 'Web Development Seminar',
                date: '2025-02-28'
            },
            {
                title: 'Annual Conference 2025',
                date: '2025-03-21'
            },
            {
                title: 'Product Lunch Webinar 2025 & Meet With Trezo Angular',
                start: '2025-03-05',
                end: '2025-03-08'
            },
            {
                title: 'Tech Summit 2025',
                date: '2025-03-14'
            },
            {
                title: 'Web Development Seminar',
                date: '2025-03-17'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2025-03-26'
            },
            {
                title: 'Meeting with Developers',
                date: '2025-03-30'
            },
            {
                title: 'Annual Conference 2025',
                date: '2025-04-05'
            },
            {
                title: 'Product Lunch Webinar 2025 & Meet With Trezo Angular',
                start: '2025-04-09',
                end: '2025-04-11'
            },
            {
                title: 'Tech Summit 2025',
                date: '2025-04-20'
            },
            {
                title: 'Meeting with UI/UX Designers',
                date: '2025-04-26'
            },
            {
                title: 'Web Development Seminar',
                date: '2025-04-29'
            },
            {
                title: 'Web Development Seminar',
                date: '2025-05-20'
            },
            {
                title: 'Web Development Seminar',
                date: '2025-05-20'
            },
            {
                title: 'Web Development Seminar',
                date: '2025-05-20'
            }
        ],
        plugins: [dayGridPlugin]
    };

    constructor(
        public themeService: CustomizerSettingsService
    ) {}

}