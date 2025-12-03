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
  selector: 'app-upgrade-licence-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './subscribe-licence-component.html',
  styleUrl: './subscribe-licence-component.scss'
})
export class SubscripeLicenceComponent {
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
    });


    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.licenceId = +params['id'];
        this.loadLicenceDetails(this.licenceId);
      }
    });
  }

  mapLicence(dto: any) {
    this.licenceDetails.id = dto.id;
    this.licenceDetails.model = dto.model;
    this.licenceDetails.mac = dto.mac;
    this.licenceDetails.plan = dto.plan;
    this.licenceDetails.tierNumber = dto.tierNumber;
    this.licenceDetails.concurrentCalls = dto.concurrentCalls;
    this.licenceDetails.expireDate = dto.expireDate;
    this.licenceDetails.subscriptionDate = dto.subscriptionDate;
    this.licenceDetails.userEmail = dto.userEmail;
    this.licenceDetails.paidAmount = dto.paidAmount;
    this.currentCalls = this.licenceDetails.concurrentCalls;
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
    this.upgradeForm.get('plan')?.reset('');
    this.upgradeForm.get('tier')?.reset('');

  }

  loadLicenceDetails(id: number) {
    this._licenceService.getLicenceById(id).subscribe({
      next: (res) => {
        const dto = res.data;
        this.mapLicence(dto);
        this.mapForm();

        this._planService.getActiveHigherPlans().subscribe({
          next: (res) => {
            this.plans = res.data;
            this.filteredPlans = this.plans.filter(
              p => p.concurrentCalls > (this.licenceDetails.concurrentCalls ?? 1)
            );
          },
          error: (err) => {
            alert(err.message);
          }
        });
      },
      error: err => alert(err.message)
    });
  }
  onPlanChange(planId: number) {
    if (!planId) return;
    this.planPeriods = this.plans.find(p => p.id == planId)?.periods ?? [];
  }

  onTierChange(id: number) {
    if (!id) return;
    this.selectedTier = this.planPeriods.find(p => p.id == id);
    const newDate = new Date();
    const daysToAdd = (this.selectedTier?.tierNumber ?? 0) * 30;
    // Add days
    newDate.setDate(newDate.getDate() + daysToAdd);
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
        this._toast.show("✅ Success", res.body.message);
        this._router.navigate(['/dashboard/licences/licences-list']);
      },
      error: (err) => {
        this._toast.show('⚠️ Error', err.message);
      }
    });
  }
}



