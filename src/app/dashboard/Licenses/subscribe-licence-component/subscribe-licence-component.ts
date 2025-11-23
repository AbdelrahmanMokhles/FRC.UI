import { Component } from '@angular/core';
import { LicenceDetails, UpgradeLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LicenceService } from '../../../Services/Dashboard/Licenses/licence-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';
import { PlansDataTableDto, PlanPeriod, PlanDetailsDto } from '../../../Models/Plan/plan.model';
import { CloudService } from '../../../Services/Dashboard/Cloud/cloud-service';
import { ToastService } from '../../../Services/Common/toast-service';

@Component({
  selector: 'app-upgrade-licence-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './subscribe-licence-component.html',
  styleUrl: './subscribe-licence-component.scss'
})
export class SubscripeLicenceComponent {
  licenceId?: number;
  licenceDetails?: LicenceDetails;
  upgradeForm!: FormGroup;
  plans: PlanDetailsDto[] = [];
  filteredPlans: PlanDetailsDto[] = [];
  planPeriods: PlanPeriod[] = [];
  selectedTier?: PlanPeriod;
  upgradeDto?: UpgradeLicenceDto;
  currentCalls: number = 0;

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
      plan: ['', Validators.required],
      concurrentCalls: ['', Validators.required],
      expireDate: ['', Validators.required],
      userEmail: ['', Validators.required],
      tier: ['', Validators.required],
    });

    this._planService.getActiveHigherPlans().subscribe({
      next: (res) => {
        this.plans = res.data;
        this.currentCalls = Number(this.upgradeForm.get('concurrentCalls')?.value);
        this.filteredPlans = this.plans.filter(
          p => p.concurrentCalls > this.currentCalls
        );
      },
      error: (err) => {
        alert(err.message);
      }
    });
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.licenceId = +params['id'];
        console.log("Idddddd : ", this.licenceId);
        this.loadLicenceDetails(this.licenceId);
      }
    });
  }

  loadLicenceDetails(id: number) {
    this._licenceService.getLicenceById(id).subscribe({
      next: (res) => {
        const dto = res.data;
        console.log("data", res.data);
        const licence: LicenceDetails = {
          id: dto.id,
          model: dto.model,
          mac: dto.mac,
          plan: dto.plan,
          concurrentCalls: dto.concurrentCalls,
          expireDate: dto.expireDate,
          userEmail: dto.userEmail
        };
        this.currentCalls = licence.concurrentCalls
        this.licenceDetails = licence;
        this.upgradeForm.patchValue({
          model: this.licenceDetails.model,
          mac: this.licenceDetails?.mac,
          plan: this.licenceDetails?.plan,
          concurrentCalls: this.licenceDetails?.concurrentCalls,
          expireDate: this.licenceDetails?.expireDate,
          userEmail: this.licenceDetails?.userEmail,
        });

      },
      error: err => alert(err.message)
    });
  }
  onPlanChange(planId: number) {
    if (!planId) return;
    this.planPeriods = this.plans.find(p => p.id == planId)?.periods ?? [];
    console.log("asasas", this.currentCalls);
  }

  onTierChange(id: number) {
    if (!id) return;
    this.selectedTier = this.planPeriods.find(p => p.id == id);
    const newDate = new Date();
    const monthsToAdd = this.selectedTier?.tierNumber ?? 0;
    // Add months
    newDate.setMonth(newDate.getMonth() + monthsToAdd);
    // Generate date
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const formatted = `${month}/${day}/${year}`;
    // Update form control
    this.upgradeForm.get('expireDate')?.setValue(formatted);
  }

  get mac(): string {
    return this.upgradeForm.get('mac')?.value;
  }
  get planPeriodId(): number {
    return this.upgradeForm.get('tier')?.value;
  }

  subscripe() {
    this.upgradeDto = {
      mac: this.mac,
      periodId: this.planPeriodId
    }
    this._cloudService.subscripeDevice(this.upgradeDto).subscribe({
      next: (res) => {
        this._toast.show("✅ Success", res.message);
        this._router.navigate(['/dashboard/licences/licences-list']);
      },
      error: (err) => {
        this._toast.show('⚠️ Error', err.message);
        console.error('⚠️ Error', err);
      }
    });
  }
}



