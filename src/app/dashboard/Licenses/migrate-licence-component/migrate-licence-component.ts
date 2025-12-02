import { Component } from '@angular/core';
import { LicenceDetails, CloudLicenceDto, MigrateLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LicenceService } from '../../../Services/Dashboard/Licenses/licence-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';
import { PlanPeriod, PlanDetailsDto } from '../../../Models/Plan/plan.model';
import { CloudService } from '../../../Services/Dashboard/Cloud/cloud-service';
import { ToastService } from '../../../Services/Common/toast-service';

@Component({
  selector: 'app-migrate-licence-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './migrate-licence-component.html',
  styleUrl: './migrate-licence-component.scss'
})
export class MigrateLicenceComponent {

  licenceId?: number;
  licenceDetails: Partial<LicenceDetails> = {};
  upgradeForm!: FormGroup;
  plans: PlanDetailsDto[] = [];
  filteredPlans: PlanDetailsDto[] = [];
  planPeriods: PlanPeriod[] = [];
  planPeriod?: PlanPeriod = {};
  tierNumber?: number;
  migrateDto?: MigrateLicenceDto;
  currentCalls: any;

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
      newMac: ['', Validators.required],
      currentPlan: ['', Validators.required],
      plan: ['', Validators.required],
      concurrentCalls: ['', Validators.required],
      expireDate: ['', Validators.required],
      userEmail: ['', Validators.required],
      newMacPlan: ['', Validators.required],
      newMacModel: ['', Validators.required],
      sendToRecycle: [false],
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.licenceId = +params['id'];
        this.loadLicenceDetails(this.licenceId);
      }
    });
    // Get plans : 
    // this._planService.getActiveHigherPlans().subscribe({
    //   next: (res) => {
    //     this.plans = res.data;
    //     this.currentCalls = Number(this.upgradeForm.get('concurrentCalls')?.value) ?? 0;
    //     this.filteredPlans = this.plans.filter(
    //       p => p.concurrentCalls > this.currentCalls
    //     );
    //   },
    //   error: (err) => {
    //     this._toast.show('⚠️ Error', err.message);
    //   }
    // });
  }


  onRecycleToggle() {
    const checked = this.upgradeForm.get('sendToRecycle')?.value;

    if (checked) {
      this.upgradeForm.get('newMac')?.disable();
      this.upgradeForm.get('newMacModel')?.disable();
      this.upgradeForm.get('newMacPlan')?.disable();
      //clear values
      this.upgradeForm.patchValue({
        newMac: '',
        newMacModel: '',
        newMacPlan: ''
      });
    } else {
      this.upgradeForm.get('newMac')?.enable();
      this.upgradeForm.get('newMacModel')?.enable();
      this.upgradeForm.get('newMacPlan')?.enable();
    }
  }

  loadLicenceDetails(id: number) {
    this._licenceService.getLicenceById(id).subscribe({
      next: (res) => {
        const dto = res.data;
        this.mapLicence(dto);
        this.mapForm();
      },
      error: err => this._toast.show('⚠️ Error', err.message)
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
    this.licenceDetails.plan = dto.plan;
    this.licenceDetails.tierNumber = dto.tierNumber;
    this.licenceDetails.concurrentCalls = dto.concurrentCalls;
    this.licenceDetails.expireDate = dto.expireDate;
    this.licenceDetails.userEmail = dto.userEmail;
    this.licenceDetails.paidAmount = dto.paidAmount;
    this.currentCalls = this.licenceDetails.concurrentCalls;
    this.tierNumber = this.licenceDetails.tierNumber;
  }

  get mac(): string {
    return this.upgradeForm.get('mac')?.value;
  }

  get isRecycled(): boolean {
    return this.upgradeForm.get('sendToRecycle')?.value;
  }

  get newMac(): string {
    return this.upgradeForm.get('newMac')?.value;
  }

  search() {
    this.upgradeForm.get('newMacPlan')?.setValue('');
    this.upgradeForm.get('newMacModel')?.setValue('');
    const mac = this.upgradeForm.get('newMac')?.value;
    if (!mac) {
      return;
    }
    this._licenceService.getLicenceByMac(mac).subscribe({
      next: (res) => {
        this.upgradeForm.patchValue({
          newMacModel: res.data.model,
          newMacPlan: res.data.plan
        });
      },
      error: (err) => {
      }
    });
  }

  migrate() {
    this.migrateDto = {
      mac: this.mac,
      isRecycled: this.isRecycled,
      mac2: this.newMac,
    }
    this._cloudService.migratePlan(this.migrateDto).subscribe({
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