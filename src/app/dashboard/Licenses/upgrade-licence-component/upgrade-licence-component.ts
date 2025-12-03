import { Component } from '@angular/core';
import { LicenceDetails, CloudLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LicenceService } from '../../../Services/Dashboard/Licenses/licence-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';
import { PlanPeriod, PlanDetailsDto } from '../../../Models/Plan/plan.model';
import { CloudService } from '../../../Services/Dashboard/Cloud/cloud-service';
import { ToastService } from '../../../Services/Common/toast-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-upgrade-licence-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './upgrade-licence-component.html',
  styleUrl: './upgrade-licence-component.scss'
})
export class UpgradeLicenceComponent {
  licenceId?: number;
  licenceDetails: Partial<LicenceDetails> = {};
  upgradeForm!: FormGroup;
  plans: PlanDetailsDto[] = [];
  filteredPlans: PlanDetailsDto[] = [];
  planPeriods: PlanPeriod[] = [];
  planPeriod: PlanPeriod = {};
  upgradeDto?: CloudLicenceDto;
  oldPassedDays: number = 0;
  oldCost: number = 0;
  oldBalance: number = 0;
  newPlanDays: number = 0;
  newCost: number = 0;
  newCostPerDay: number = 0;
  amountToPay: number = 0;
  currentPlanPrice: any;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _licenceService: LicenceService,
    private fb: FormBuilder,
    private _planService: PlanService,
    private _cloudService: CloudService,
    private _toast: ToastService,
  ) {

  }

  ngOnInit() {
    this.upgradeForm = this.fb.group({
      model: ['', Validators.required],
      mac: ['', Validators.required],
      currentPlan: ['', Validators.required],
      plan: ['', Validators.required],
      concurrentCalls: ['', Validators.required],
      expireDate: ['', Validators.required],
      userEmail: ['', Validators.required],
      price: ['', Validators.required],
      distiDiscount: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.licenceId = +params['id'];
        this.loadLicenceDetails(this.licenceId);
      }
    });
  }

  loadLicenceDetails(id: number) {
    this._licenceService.getLicenceById(id).subscribe({
      next: (res) => {
        const dto = res.data;
        this.mapLicence(dto);
        this.mapForm();
        // Get plans : 
        this.fetchPlans();
      },
      error: err => this._toast.show('⚠️ Error', err.message)
    });
  }
  fetchPlans() {
    this._planService.getActiveHigherPlans().subscribe({
      next: (res) => {
        this.plans = res.data;
        this.filteredPlans = this.plans.filter(
          p => p.concurrentCalls > (this.licenceDetails.concurrentCalls ?? 1)
        );
      },
      error: (err) => {
        this._toast.show('⚠️ Error', err.message);
      }
    });
  }
  mapForm() {
    this.upgradeForm.patchValue({
      model: this.licenceDetails.model,
      mac: this.licenceDetails?.mac,
      plan: this.licenceDetails?.plan,
      currentPlan: this.licenceDetails.plan,
      concurrentCalls: this.licenceDetails?.concurrentCalls,
      expireDate: this.licenceDetails?.expireDate,
      userEmail: this.licenceDetails?.userEmail,
      tier: this.licenceDetails.tierNumber,
    });
  }
  mapLicence(dto: any) {
    this.licenceDetails.id = dto.id;
    this.licenceDetails.model = dto.model;
    this.licenceDetails.mac = dto.mac;
    this.licenceDetails.planId = dto.planId;
    this.licenceDetails.plan = dto.plan;
    this.licenceDetails.tierNumber = dto.tierNumber;
    this.licenceDetails.concurrentCalls = dto.concurrentCalls;
    this.licenceDetails.expireDate = dto.expireDate;
    this.licenceDetails.subscriptionDate = dto.subscriptionDate;
    this.licenceDetails.userEmail = dto.userEmail;
    this.licenceDetails.paidAmount = dto.paidAmount;
  }

  async onPlanChange(planId: number) {
    if (!planId) return;
    const period = await this.loadPlanPeriods(planId);
    if (!period) {
      this._toast.show('⚠️ Error', 'Plan period not found');
      return;
    }
    // update form UI
    this.upgradeForm.get('price')?.setValue(`${period.price} $`);
    this.upgradeForm.get('distiDiscount')?.setValue(`${period.distiDiscount} %`);
    // now the math works because period.price is available!
    this.calculateDifference(
      this.licenceDetails.paidAmount ?? 0,
      period.price ?? 0,
      this.licenceDetails.expireDate!,
      this.licenceDetails.subscriptionDate!
    );
  }


  async loadPlanPeriods(planId: number): Promise<PlanPeriod | null> {
    const res = await firstValueFrom(this._planService.getPlanById(planId));
    this.planPeriods = res.data.periods;
    this.planPeriod = this.planPeriods.find(p => p.tierNumber == this.licenceDetails.tierNumber) || {};
    return this.planPeriod;
  }

  get multiplierControl(): any {
    return this.upgradeForm.get('multiplier');
  }

  get mac(): string {
    return this.upgradeForm.get('mac')?.value;
  }
  get assignedPlan(): string {
    return this.upgradeForm.get('plan')?.value;
  }

  parseDDMMYYYY(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  private calculateDifference(
    totaPaidAmount: number,
    newPlanPrice: number,
    exp: string,
    sub: string
  ) {
    const upgradeDate = new Date();
    const expDate = this.parseDDMMYYYY(exp);
    const subDate = this.parseDDMMYYYY(sub);
    // 1 day in ms
    const ONE_DAY = 1000 * 60 * 60 * 24;
    // 1️⃣ Days passed
    this.oldPassedDays = Math.ceil((upgradeDate.getTime() - subDate.getTime()) / ONE_DAY);
    // Subscription period
    const subscribedDays = Math.ceil((expDate.getTime() - subDate.getTime()) / ONE_DAY);
    const renewals = subscribedDays / (this.licenceDetails.tierNumber ?? 1) / 30;
    const totalDays = renewals * 30 * (this.licenceDetails.tierNumber ?? 1);
    this.currentPlanPrice = Number(this.licenceDetails.paidAmount ?? 1) / renewals;

    // 2️⃣ Days remaining
    this.newPlanDays = Math.floor((expDate.getTime() - upgradeDate.getTime()) / ONE_DAY);

    // 3️⃣ OLD cost per day
    const oldCostPerDay = (totaPaidAmount / totalDays);
    this.oldCost = Number((this.oldPassedDays * oldCostPerDay).toFixed(2));

    // 4️⃣ OLD balance
    this.oldBalance = Number(((totaPaidAmount - this.oldCost)).toFixed(2));

    const upgradeYears = (expDate.getFullYear() - upgradeDate.getFullYear());
    // 5️⃣ NEW cost per day
    const newCostPerDay = (newPlanPrice / (30 * (this.licenceDetails.tierNumber ?? 1)));
    this.newCostPerDay = newCostPerDay;

    // 6️⃣ NEW total cost
    this.newCost = Number((this.newPlanDays * newCostPerDay).toFixed(2));

    // 7️⃣ Required to pay
    this.amountToPay = Number((this.newCost - this.oldBalance).toFixed(2));
    console.log("Upgrade Math:", {
      expDate,
      subDate
    });
  }

  upgrade() {
    const now = new Date();
    this.upgradeDto = {
      mac: this.mac,
      periodId: this.planPeriods.find(p => p.tierNumber === this.licenceDetails.tierNumber)?.id,
    }
    this._cloudService.upgradeDevice(this.upgradeDto).subscribe({
      next: (res) => {
        this._toast.show("✅ Success", res.body.message);
        this._router.navigate(['/dashboard/licences/licences-list']);
      },
      error: (err) => {
        this._toast.show('⚠️ Error', err.message);
      }
    });
  }
}