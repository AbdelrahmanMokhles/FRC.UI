import { Component } from '@angular/core';
import { LicenceDetails, UpgradeLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LicenceService } from '../../../Services/Dashboard/Licenses/licence-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';
import { PlansDataTableDto, PlanPeriod } from '../../../Models/Plan/plan.model';
import { error } from 'console';
import { CloudService } from '../../../Services/Dashboard/Cloud/cloud-service';

@Component({
  selector: 'app-upgrade-licence-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './upgrade-licence-component.html',
  styleUrl: './upgrade-licence-component.scss'
})
export class UpgradeLicenceComponent {
  licenceId?: number;
  licenceDetails?: LicenceDetails;
  upgradeForm!: FormGroup;
  plans: PlansDataTableDto[] = [];
  planPeriods: PlanPeriod[] = [];
  selectedTier?: PlanPeriod;
  upgradeDto?: UpgradeLicenceDto;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _licenceService: LicenceService,
    private fb: FormBuilder,
    private _planService: PlanService,
    private _cloudService: CloudService,
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

    this._planService.getActivePlans().subscribe({
      next: (res) => {
        this.plans = res.data;
      },
      error: (err) => {
        alert(err.message);
      }
    });
    // plan.periods.forEach((p: any) => {
    //         this.periods.push(this.createPeriodGroup({
    //           period: p.period,
    //           price: p.endUserPrice ?? p.price,
    //           distiDiscount: p.distiDiscount
    //         }));
    //       });

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

    this._planService.getPlanById(planId).subscribe({
      next: (res) => {
        const plan = res.data;

        this.planPeriods = plan.periods ?? [];

        console.log("Loaded periods:", this.planPeriods);
      },
      error: (err) => {
        console.error("Failed to load plan periods", err);
      }
    });
  }

  onTierChange(id: number) {
    if (!id) return;
    this.selectedTier = this.planPeriods.find(p => p.id == id);
    console.log("Tier ", this.selectedTier);
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
    console.log(this.upgradeDto);

    // this._licenceService.subscripe(this.upgradeDto).subscribe({
    this._cloudService.subscripeDevice(this.upgradeDto).subscribe({
      next: (res) => {
        alert('✅' + res.message);
        this._router.navigate(['/dashboard/licences/licences-list']);

      },
      error: (err) => {
        console.error("Failed to load plan periods", err);
      }
    });
  }
}



