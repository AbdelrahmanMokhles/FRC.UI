import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-flush',
    imports: [NgClass],
    templateUrl: './flush.component.html',
    styleUrl: './flush.component.scss'
})
export class FlushComponent {

    // Accordion
    openSectionIndex: number = 0;
    toggleSection(index: number): void {
        if (this.openSectionIndex === index) {
            this.openSectionIndex = -1;
        } else {
            this.openSectionIndex = index;
        }
    }
    isSectionOpen(index: number): boolean {
        return this.openSectionIndex === index;
    }

}