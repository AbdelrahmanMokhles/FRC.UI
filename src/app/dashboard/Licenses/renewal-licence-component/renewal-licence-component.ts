import { Component } from '@angular/core';
import { LicenceDetails, CloudLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LicenceService } from '../../../Services/Dashboard/Licenses/licence-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';
import { PlansDataTableDto, PlanPeriod, PlanDetailsDto } from '../../../Models/Plan/plan.model';
import { CloudService } from '../../../Services/Dashboard/Cloud/cloud-service';
import { ToastService } from '../../../Services/Common/toast-service';

@Component({
  selector: 'app-renewal-licence-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './renewal-licence-component.html',
  styleUrl: './renewal-licence-component.scss'
})
export class RenewalLicenceComponent {
  licenceId?: number;
  licenceDetails: LicenceDetails = {};
  upgradeForm!: FormGroup;
  plans: PlanDetailsDto[] = [];
  filteredPlans: PlanDetailsDto[] = [];
  planPeriods: PlanPeriod[] = [];
  selectedTier?: PlanPeriod;
  upgradeDto?: CloudLicenceDto;
  currentCalls: any;
  isRenewal: boolean = false;

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
      tier: ['', Validators.required],
      multiplier: [1, Validators.required],
      price: [''],
      distiDiscount: [''],
    });
    this.isRenewal = true;
    this.planPeriods = this.plans.find(p => p.planName == this.licenceDetails?.plan)?.periods ?? [];

    this._planService.getActiveHigherPlans().subscribe({
      next: (res) => {
        this.plans = res.data;
        this.currentCalls = Number(this.upgradeForm.get('concurrentCalls')?.value) ?? 0;
        this.filteredPlans = this.plans.filter(
          p => p.concurrentCalls > this.currentCalls
        );
      },
      error: (err) => {
        this._toast.show('⚠️ Error', err.message);
      }
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
        this.licenceDetails.id = dto.id;
        this.licenceDetails.model = dto.model;
        this.licenceDetails.mac = dto.mac;
        this.licenceDetails.planId = dto.planId;
        this.licenceDetails.plan = dto.plan;
        this.licenceDetails.tierNumber = dto.tierNumber;
        this.licenceDetails.concurrentCalls = dto.concurrentCalls;
        this.licenceDetails.expireDate = dto.expireDate;
        this.licenceDetails.userEmail = dto.userEmail;
        this.currentCalls = this.licenceDetails.concurrentCalls;
        this.loadPlanPeriods(res.data.planId ?? 1);
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
      },
      error: err => this._toast.show('⚠️ Error', err.message)

    });
  }
  loadPlanPeriods(planId: number) {
    this._planService.getPlanById(planId).subscribe({
      next: (res) => {
        this.planPeriods = res.data.periods;
        this.upgradeForm.get('price')?.setValue(`${this.planPeriods.find(p => p.tierNumber === this.licenceDetails.tierNumber)?.price} $`);
        this.upgradeForm.get('distiDiscount')?.setValue(`${this.planPeriods.find(p => p.tierNumber === this.licenceDetails.tierNumber)?.distiDiscount} %`);
        this.manageMultiplier();
        this.calculateDate_Price(this.licenceDetails.expireDate, this.licenceDetails.tierNumber ?? 1, 1);
      },
      error: err => this._toast.show('⚠️ Error', err.message)

    });
  }


  calculateDate_Price(expDate: any, tierNumber: number, multiplier: number) {
    const newDate = new Date(expDate);
    const monthsToAdd = (tierNumber) * multiplier;
    // Add months
    newDate.setMonth(newDate.getMonth() + monthsToAdd);
    // Generate date
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const formatted = `${month}/${day}/${year}`;
    // Update form control
    this.upgradeForm.get('expireDate')?.setValue(formatted);
    const price = (this.planPeriods.find(p => p.tierNumber === this.licenceDetails.tierNumber)?.price ?? 0) * (multiplier ?? 1);
    this.upgradeForm.get('price')?.setValue(`${price} $`);
  }
  onMultiplierChange(number: number) {
    this.calculateDate_Price(this.licenceDetails?.expireDate, this.licenceDetails.tierNumber ?? 0, number ?? 1);
  }
  manageMultiplier() {
    if (this.licenceDetails.tierNumber === 12) {
      this.multiplierControl.enable();
    } else {
      this.upgradeForm.get('multiplier')?.setValue("1");
      this.multiplierControl.disable();
    }
    // this.calculateDate_Price(this.licenceDetails?.expireDate, this.selectedTier?.tierNumber ?? 0, 1);
  }

  get multiplierControl(): any {
    return this.upgradeForm.get('multiplier');
  }

  get mac(): string {
    return this.upgradeForm.get('mac')?.value;
  }
  get planPeriodId(): number {
    return this.upgradeForm.get('tier')?.value;
  }

  renew() {
    const multiplier = this.multiplierControl.enabled
      ? Number(this.multiplierControl.value)
      : 1;
    this.upgradeDto = {
      mac: this.mac,
      periodId: this.planPeriods.find(p => p.tierNumber === this.licenceDetails.tierNumber)?.id,
      periodMultiplier: multiplier
    }
    this._cloudService.renewalDevice(this.upgradeDto).subscribe({
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



