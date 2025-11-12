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
    // plans = signal<Plan[]>([
    //     { id: 1, selected: false, planName: 'Free', concurrentCall: 2, periodMonths: 1188, endUserPrice: 0, activeSubscribers: 250, status: 'Active' },
    //     { id: 2, selected: false, planName: 'Startup', concurrentCall: 4, periodMonths: 12, endUserPrice: 75, activeSubscribers: 50, status: 'Active' },
    //     { id: 3, selected: false, planName: 'Business', concurrentCall: 8, periodMonths: 12, endUserPrice: 115, activeSubscribers: 20, status: 'Active' },
    //     { id: 4, selected: false, planName: 'Business Plus', concurrentCall: 16, periodMonths: 12, endUserPrice: 185, activeSubscribers: 25, status: 'Archived' },
    //     { id: 5, selected: false, planName: 'Business Pro', concurrentCall: 32, periodMonths: 12, endUserPrice: 299, activeSubscribers: 10, status: 'Active' },
    //     { id: 6, selected: false, planName: 'Enterprise', concurrentCall: 64, periodMonths: 12, endUserPrice: 499, activeSubscribers: 3, status: 'Active' },
    // ]);

    plans = signal<Plan[]>([]);
    searchTerm = signal('');

    filteredPlans = computed(() => {
        const term = this.searchTerm().toLowerCase();
        if (!term) {
            return this.plans();
        }
        return this.plans().filter(plan =>
            plan.planName.toLowerCase().includes(term)
        );
    });

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

