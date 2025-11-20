import {
  Component,
  ChangeDetectionStrategy,
  inject,
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



@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.html',
  styleUrl: './add-plan.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      internalNote: ['']
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
      }
    });
    this.updateNextPeriod();
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
        console.log("archhhh", this.isArchived);
        const plan = res.data ?? res;
        console.log('🟢 Loaded plan:', plan);

        // Fill main plan fields
        this.planForm.patchValue({
          planName: plan.planName,
          concurrentCalls: plan.concurrentCalls,
          period: plan.period,
          internalNote: plan.internalNote || ''
        });

        // Clear existing periods (if any)
        // this.periods.clear();

        // Fill periods array properly
        // if (plan.periods && Array.isArray(plan.periods)) {
        //   plan.periods.forEach((p: any) => {
        //     this.periods.push(this.createPeriodGroup({
        //       tierNumber: p.tierNumber,
        //       price: p.endUserPrice ?? p.price,
        //       distiDiscount: p.distiDiscount
        //     }));
        //   });
        // }

        // Prepare next period number for adding new ones
        this.updateNextPeriod();
      },
      error: (err) => console.error('❌ Failed to load plan:', err)
    });
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

  calculateMonths(period: number): number {
    const periodMonths = this.periodMonthsControl.value || 0;
    return period * periodMonths;
  }

  addPeriod() {
    if (this.periodForm.valid) {
      this.periods.push(this.createPeriodGroup(this.periodForm.value));
      this.periodForm.reset({
        price: '',
        distiDiscount: '',
      });
      this.updateNextPeriod();
    }
  }

  removePeriod(index: number) {
    this.periods.removeAt(index);
    this.updateNextPeriod();
  }

  updateNextPeriod() {
    const nextPeriod =
      this.periods.length > 0
        ? this.periods.at(this.periods.length - 1).value.period + 1
        : 1;
    this.periodForm.patchValue({ period: nextPeriod });
  }



  // Toast
  toast = false;
  toggleToast() {
    this.toast = true;
  }
  toastTitle = 'Validation Error';
  toastBody = '';
  hideAlert() {
    setTimeout(() => {
      this.toast = false;
    }, 2000);
  }

  archive() {
    if (this.planId) {
      this._planService.archivePlan(this.planId).subscribe({
        next: (res) => {
          alert('✅' + res.message);
          this._router.navigate(['/dashboard/plans/plans-list']);
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
            alert('✅' + res.message);
            this._router.navigate(['/dashboard/plans/plans-list']);
          },
          error: (err) => console.error(err)
        });
      }
      else {
        this._planService.AddPlan(this.AddPlanDto).subscribe({
          next: (res) => {
            console.log(res);
            this._router.navigate(['/dashboard/plans/plans-list']);
          },
          error: (error) => {
            alert(error.error.message)
            if (error.error.statusCode === 400) {
              this.toastBody = error.error.message;
              this.toastTitle = 'Error';
              this.toggleToast();
              this.hideAlert();
            } else if (error.status === 500) {
              this.toastTitle = 'Error';
              this.toastBody = 'Internal server erro';
              this.toggleToast();
              this.hideAlert();
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
