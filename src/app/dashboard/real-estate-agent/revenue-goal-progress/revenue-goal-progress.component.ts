import { Component, HostListener } from '@angular/core';
import { RevenueGoalProgressService } from './revenue-goal-progress.service';

@Component({
    selector: 'app-revenue-goal-progress',
    imports: [],
    templateUrl: './revenue-goal-progress.component.html',
    styleUrl: './revenue-goal-progress.component.scss'
})
export class RevenueGoalProgressComponent {

    selectedTimeframe: string = 'Monthly'; // Default dropdown text
    chartData: {
        [key: string]: {
            series: { name: string, data: number[] }[],
            categories: string[]
        }
    };

    constructor(
        private revenueGoalProgressService: RevenueGoalProgressService
    ) {
        // Define the data for each timeframe
        this.chartData = {
            'Weekly': {
                series: [
                    { name: 'Prediction', data: [108, 110, 105, 120, 115, 125, 130] },
                    { name: 'Gained', data: [125, 130, 115, 140, 125, 135, 145] }
                ],
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            'Monthly': {
                series: [
                    { name: 'Prediction', data: [108, 130, 110, 140, 130, 115, 125, 115, 125, 140, 140, 130] },
                    { name: 'Gained', data: [135, 115, 128, 120, 125, 130, 135, 130, 135, 145, 120, 125] }
                ],
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            'Yearly': {
                series: [
                    { name: 'Prediction', data: [150, 175, 190, 200, 220] },
                    { name: 'Gained', data: [170, 200, 210, 240, 250] }
                ],
                categories: ['2021', '2022', '2023', '2024', '2025']
            }
        };
    }

    ngOnInit(): void {
        // Load the default chart
        const defaultData = this.chartData[this.selectedTimeframe];
        this.revenueGoalProgressService.loadChart(defaultData.series, defaultData.categories);
    }

    onTimeframeChange(timeframe: string): void {
        this.selectedTimeframe = timeframe; // Update button text
        const selectedData = this.chartData[timeframe];
        this.revenueGoalProgressService.updateChart(selectedData.series, selectedData.categories);
    }
    
    // Card Header Menu
    isCardHeaderOpen = false;
    toggleCardHeaderMenu() {
        this.isCardHeaderOpen = !this.isCardHeaderOpen;
    }
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        if (!target.closest('.trezo-card-header-menu')) {
            this.isCardHeaderOpen = false;
        }
    }

}