import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CommonModule, NgClass } from '@angular/common';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';
import { PlanDetailsDto, PlanPeriod } from '../../../Models/Plan/plan.model';
import { date } from 'yup';

@Component({
  selector: 'app-plan-info-component',
  imports: [CommonModule],
  templateUrl: './plan-info-component.html',
  styleUrl: './plan-info-component.scss'
})
export class PlanInfoComponent {


  planDetails?: PlanDetailsDto;
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

  formatDateOnly(date: Date): string {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-');
  }



  loadPlanDetails(id: number) {
    this._planService.getPlanById(id).subscribe({
      next: (res) => {
        const dto = res.data;
        console.log("data", res.data);

        const plan: PlanDetailsDto = {
          planName: dto.planName,
          concurrentCalls: dto.concurrentCalls,
          period: dto.period,
          internalNote: dto.internalNote,
          periods: dto.periods ?? [],
          status: dto.isArchived ? 'Archived' : 'Active',
          createdDate: this.formatDateOnly(new Date(dto.createdAt))
        };

        console.log("Mapped Plan:", plan);

        this.planDetails = plan;
      },
      error: err => alert(err)
    });
  }
  calculateMonths(period: number): number {
    const periodMonths = this.planDetails?.period || 0;
    return period * periodMonths;
  }
}
