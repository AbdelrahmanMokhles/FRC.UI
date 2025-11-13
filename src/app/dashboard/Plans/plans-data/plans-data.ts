//#region Old 
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plan } from '../../../Models/Plan/plan.model';
import { RouterLink } from '@angular/router';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';

@Component({
    selector: 'app-plans-data',
    imports: [CommonModule, RouterLink],
    templateUrl: './plans-data.html',
    styleUrl: './plans-data.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansData {
    constructor(
        private _planService: PlanService,
    ) {
        this.loadPlans();
    }
    plans = signal<Plan[]>([]);
    searchTerm = signal('');
    sortColumn = signal<string>('planName');
    sortDirection = signal<'asc' | 'desc'>('asc');

    filteredPlans = computed(() => {
        const term = this.searchTerm().toLowerCase();
        if (!term) {
            return this.plans();
        }
        return this.plans().filter(plan =>
            plan.planName.toLowerCase().includes(term)
        );
    });

    // filteredPlans = computed(() => {
    //     const term = this.searchTerm().toLowerCase();
    //     let plans = this.plans();

    //     // Filter by search
    //     if (term) {
    //         plans = plans.filter(p => p.planName.toLowerCase().includes(term));
    //     }

    //     // Sort by selected column
    //     const column = this.sortColumn();
    //     const direction = this.sortDirection();

    //     return [...plans].sort((a, b) => {
    //         const valA = String(a[column as keyof Plan] ?? '').toLowerCase();
    //         const valB = String(b[column as keyof Plan] ?? '').toLowerCase();
    //         if (valA < valB) return direction === 'asc' ? -1 : 1;
    //         if (valA > valB) return direction === 'asc' ? 1 : -1;
    //         return 0;
    //     });
    // });
    // sort(column: string) {
    //     if (this.sortColumn() === column) {
    //         // toggle direction
    //         this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    //     } else {
    //         this.sortColumn.set(column);
    //         this.sortDirection.set('asc');
    //     }
    // }



    allSelected = computed(() =>
        this.filteredPlans().length > 0 && this.filteredPlans().every(p => p.selected)
    );

    someSelected = computed(() => {
        const filtered = this.filteredPlans();
        return filtered.some(p => p.selected) && !filtered.every(p => p.selected);
    });

    loadPlans() {
        this._planService.getPlans(1, 50).subscribe({
            next: (res) => {
                console.log(res.data)
                const items = (res.data.items ?? res.data ?? []).map((p: any) => ({
                    ...p,
                    selected: false,
                    status: p.isArchived ? 'Archived' : 'Active'
                }));
                this.plans.set(items);
            },
            error: (err) => {
                console.error('❌ Failed to load plans:', err);
            }
        });
    }
    onSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        this.searchTerm.set(input.value);
    }

    deletePlan(planId: number) {
        this.plans.update(plans => plans.filter(p => p.id !== planId));
    }

    toggleAll() {
        const select = !this.allSelected();
        const filteredIds = new Set(this.filteredPlans().map(p => p.id));

        this.plans.update(plans =>
            plans.map(p => {
                if (filteredIds.has(p.id)) {
                    return { ...p, selected: select };
                }
                return p;
            })
        );
    }

    toggleOne(planId: number) {
        this.plans.update(plans =>
            plans.map(p => (p.id === planId ? { ...p, selected: !p.selected } : p))
        );
    }
}



//#endregion



