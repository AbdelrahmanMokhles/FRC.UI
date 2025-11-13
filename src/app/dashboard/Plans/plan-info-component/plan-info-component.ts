import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { NgClass } from '@angular/common';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';
import { Plan, PlanDto, PlanPeriod } from '../../../Models/Plan/plan.model';

@Component({
  selector: 'app-plan-info-component',
  imports: [],
  templateUrl: './plan-info-component.html',
  styleUrl: './plan-info-component.scss'
})
export class PlanInfoComponent {


  planDetails?: PlanDto;
  planPeriods: PlanPeriod[] = [];

  planId?: number;

  constructor(
    public themeService: CustomizerSettingsService,
    private _planService: PlanService,
    private _router: Router,
    private route: ActivatedRoute

  ) {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.planId = +params['id'];
        this.loadPlanDetails(this.planId);
      }
    });
  }


  loadPlanDetails(id: number) {
    this._planService.getPlanById(id).subscribe({
      next: (res) => {

        const plan = {
          ...res.data,
          status: res.data.isArchived ? 'Archived' : 'Active'
        };

        console.log('🟢 Loaded plan:', plan);
        this.planDetails = plan;
        this.planPeriods = plan.periods ?? [];
      },
      error: (err) => console.error('❌ Failed to load plan:', err)
    });
  }

  // Tabs
  currentTab = 'tab1';
  switchTab(event: MouseEvent, tab: string) {
    event.preventDefault();
    this.currentTab = tab;
  }

}
