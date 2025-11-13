//#region Old 
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Plan } from '../../../Models/Plan/plan.model';
import { Router, RouterLink } from '@angular/router';
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
        private _router: Router
    ) {
        this.loadPlans();
    }
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




    loadPlans() {
        this._planService.getPlans().subscribe({
            next: (res) => {
                // console.log(res.data)
                const items = (res.data.items ?? res.data ?? []).map((p: any) => ({
                    ...p,
                    status: p.isArchived ? 'Archived' : 'Active'
                }));
                this.plans.set(items);
            },
            error: (err) => {
                console.log(err);
                alert('❌ Failed to load plans:');
            }
        });
    }

    planInfo(planId: number) {
        this._router.navigate(['/dashboard/plans/plan-info'], { queryParams: { id: planId } });
    }
    editPlan(planId: number) {
        this._router.navigate(['/dashboard/plans/add-plan'], { queryParams: { id: planId } });
    }

    deletePlan(planId: number) {
        this.plans.update(plans => plans.filter(p => p.id !== planId));
    }

    // onSearch(event: Event) {
    //     const input = event.target as HTMLInputElement;
    //     this.searchTerm.set(input.value);
    // }

}



//#endregion



