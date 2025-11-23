import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { PlanPeriod, AddPlanDto } from '../../../Models/Plan/plan.model';
import { PlanService } from '../../../Services/Dashboard/Plans/plan-service';
import { error } from 'console';
import * as yup from 'yup';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { YupValidator } from '../../../Validators/Yup-Validator/yup-validator';
import { ToastService } from '../../../Services/Common/toast-service';



@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.html',
  styleUrl: './add-plan.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class AddPlan implements OnInit {

  planId?: number;
  planFormErrors: any = {};
  periodFormErrors: any = {};
  planForm!: FormGroup;
  periodForm!: FormGroup;
  AddPlanDto: AddPlanDto = {}
  isUpdate = false;
  isArchived!: boolean;


  constructor(
    private fb: FormBuilder,
    private _planService: PlanService,
    private _toast: ToastService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }


  planSchema = yup.object({
    planName: yup.string().required('Plan name is required'),
    concurrentCalls: yup.number().typeError('Must be number').required('Concurrent calls required').min(1, 'Must be at least 1'),
    period: yup.number().required('Period months required').min(1, 'Must be at least 1'),
    internalNote: yup.string(),
  });


  periodSchema = yup.object({
    period: yup.number().typeError('Must be number').required('Period is required').min(1),
    price: yup.number().typeError('Must be number').required('Price is required').min(1),
    distiDiscount: yup.number().typeError('Must be number').required('Discount is required').min(0, 'Must be at least 1').max(100, 'Must be at most 100'),
  });




  ngOnInit() {
    this.planForm = this.fb.group({
      planName: ['', Validators.required],
      concurrentCalls: [, [Validators.required, Validators.min(1)]],
      period: [1, [Validators.required, Validators.min(1)]],
      periods: this.fb.array([]),
      internalNote: [''],
      isArchived: [false],
    });
    this.periodForm = this.fb.group({
      tierNumber: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      distiDiscount: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.addInitialPeriods();

    this.planForm.valueChanges.subscribe(async (values) => {
      await YupValidator(values, this.planSchema, this.planFormErrors);
    });
    this.periodForm.valueChanges.subscribe(async (values) => {
      await YupValidator(values, this.periodSchema, this.periodFormErrors);
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true;
        this.planId = +params['id'];
        this.loadPlanForEdit(this.planId);
        this.planForm.get('isArchived')?.enable();
      }
    });
    // if (this.isUpdate) {
    //   this.planForm.get('planName')?.disable();
    //   this.planForm.get('concurrentCalls')?.disable();
    // }
    // this.updateNextPeriod();
  }

  addInitialPeriods() {
    const initialPeriods: PlanPeriod[] =
      [{ tierNumber: 1, price: 20, distiDiscount: 10 },
      { tierNumber: 3, price: 50, distiDiscount: 15 },
      { tierNumber: 6, price: 90, distiDiscount: 20 },
      { tierNumber: 12, price: 150, distiDiscount: 25 }];
    initialPeriods.forEach(p => {
      this.periods.push(this.fb.group(p));
    });
  }

  loadPlanForEdit(id: number) {
    this._planService.getPlanById(id).subscribe({
      next: (res) => {
        this.isArchived = res.data.isArchived;
        const plan = res.data ?? res;
        // Fill main plan fields
        this.planForm.patchValue({
          planName: plan.planName,
          concurrentCalls: plan.concurrentCalls,
          period: plan.period,
          internalNote: plan.internalNote || '',
          isArchived: plan.isArchived
        });
        if (this.isArchived) {
          this.planForm.disable();
        }
        // Prepare next period number for adding new ones
        // this.updateNextPeriod();
      },
      error: (err) => console.error('❌ Failed to load plan:', err)
    });
  }

  onArchiveToggle() {
    this.isArchived = !this.isArchived;
    // const archived = this.planForm.get('isArchived')?.value;
    if (this.isArchived) {
      this.planForm.disable();
      this.planForm.get('isArchived')?.enable(); // keep switch usable
      this.changeArchiveStatus();
    }
    else {
      this.changeArchiveStatus();
      this.planForm.enable();
    }
  }

  createPeriodGroup(periodData: PlanPeriod): FormGroup {
    return this.fb.group({
      period: [
        periodData.tierNumber,
        [Validators.required, Validators.min(1)],
      ],
      price: [
        periodData.price,
        [Validators.required, Validators.min(0)],
      ],
      distiDiscount: [
        periodData.distiDiscount,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }


  get periods(): FormArray {
    return this.planForm.get('periods') as FormArray;
  }

  get periodMonthsControl(): FormControl {
    return this.planForm.get('period') as FormControl;
  }

  get planName(): FormControl {
    return this.planForm.get('planName') as FormControl;
  }

  calculateMonths(period: number): number {
    const periodMonths = this.periodMonthsControl.value || 0;
    return period * periodMonths;
  }

  // addPeriod() {
  //   if (this.periodForm.valid) {
  //     this.periods.push(this.createPeriodGroup(this.periodForm.value));
  //     this.periodForm.reset({
  //       price: '',
  //       distiDiscount: '',
  //     });
  //     this.updateNextPeriod();
  //   }
  // }

  // removePeriod(index: number) {
  //   this.periods.removeAt(index);
  //   this.updateNextPeriod();
  // }

  // updateNextPeriod() {
  //   const nextPeriod =
  //     this.periods.length > 0
  //       ? this.periods.at(this.periods.length - 1).value.period + 1
  //       : 1;
  //   this.periodForm.patchValue({ period: nextPeriod });
  // }

  changeArchiveStatus() {
    if (this.planId) {
      this._planService.archivePlan(this.planId).subscribe({
        next: (res) => {
          this._toast.show("✅ Success", res.message);
          setTimeout(() => {
            this._router.navigate(['/dashboard/plans/plans-list']);
          }, 1000);
        },
        error: (err) => console.error(err)
      });
    }
  }

  save() {
    if (this.planForm.valid) {
      this.AddPlanDto = this.planForm.value;
      this.AddPlanDto.isUpdate = this.isUpdate;
      if (this.isUpdate && this.planId) {
        this._planService.updatePlan(this.planId, this.AddPlanDto).subscribe({
          next: (res) => {
            this._toast.show("✅ Success", res.message);
            setTimeout(() => {
              this._router.navigate(['/dashboard/plans/plans-list']);
            }, 1000);
          },
          error: (err) => {
            this._toast.show("⚠️ Error", err.error.message);
          }
        });
      }
      else {
        this._planService.AddPlan(this.AddPlanDto).subscribe({
          next: (res) => {
            this._toast.show("✅ Success", res.message);
            setTimeout(() => {
              this._router.navigate(['/dashboard/plans/plans-list']);
            }, 1000);
          },
          error: (error) => {
            if (error.error.statusCode === 400) {
              console.log("ererere", error.error);
              this._toast.show("⚠️ Error", error.error.message);
            } else if (error.status === 500) {
              this._toast.show("⚠️ Error", 'Internal server error');
            }
          },
        })
      }
    } else {
      console.error('Form is invalid.');
      alert('Please fill out all required fields correctly.');
      this.planForm.markAllAsTouched();
    }
  }

}
