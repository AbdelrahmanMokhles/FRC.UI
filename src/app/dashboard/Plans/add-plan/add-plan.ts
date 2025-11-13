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
import { PlanPeriod, PlanDto } from '../../../Models/Plan/plan.model';
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
  planDto: PlanDto = {}
  isUpdate = false;


  constructor(
    private fb: FormBuilder,
    private _planService: PlanService,
    private _router: Router,
    private route: ActivatedRoute
  ) { }


  planSchema = yup.object({
    planName: yup.string().required('Plan name is required'),
    concurrentCalls: yup.number().required('Concurrent calls required').min(1, 'Must be at least 1'),
    period: yup.number().required('Period months required').min(1, 'Must be at least 1'),
    internalNote: yup.string(),
  });


  periodSchema = yup.object({
    period: yup.number().required('Period is required').min(1),
    price: yup.number().required('Price is required').min(1),
    distiDiscount: yup.number().required('Discount is required').min(0, 'Must be at least 1').max(100, 'Must be at most 100'),
  });




  ngOnInit() {
    this.planForm = this.fb.group({
      planName: ['', Validators.required],
      concurrentCalls: [, [Validators.required, Validators.min(1)]],
      period: [, [Validators.required, Validators.min(1)]],
      periods: this.fb.array([]),
      internalNote: ['']
    });
    this.periodForm = this.fb.group({
      period: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      distiDiscount: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

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

  loadPlanForEdit(id: number) {
    this._planService.getPlanById(id).subscribe({
      next: (res) => {
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
        this.periods.clear();

        // Fill periods array properly
        if (plan.periods && Array.isArray(plan.periods)) {
          plan.periods.forEach((p: any) => {
            this.periods.push(this.createPeriodGroup({
              period: p.period,
              price: p.endUserPrice ?? p.price,
              distiDiscount: p.distiDiscount
            }));
          });
        }

        // Prepare next period number for adding new ones
        this.updateNextPeriod();
      },
      error: (err) => console.error('❌ Failed to load plan:', err)
    });
  }


  createPeriodGroup(periodData: PlanPeriod): FormGroup {
    return this.fb.group({
      period: [
        periodData.period,
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

  save() {
    if (this.planForm.valid) {
      this.planDto = this.planForm.value;
      this.planDto.isUpdate = this.isUpdate;
      if (this.isUpdate && this.planId) {
        this._planService.updatePlan(this.planId, this.planDto).subscribe({
          next: (res) => {
            console.log('✅ Updated successfully', res);
            alert('✅ Updated successfully');
            this._router.navigate(['/dashboard/plans/plans-list']);
          },
          error: (err) => console.error(err)
        });
      }
      else {
        this._planService.AddPlan(this.planDto).subscribe({
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

  // cancel() {
  //   this.periods.clear();
  //   this.planForm.reset({
  //     planName: 'Startup',
  //     concurrentCalls: 4,
  //     period: 12,
  //     internalNote: '',
  //   });
  //   // this.addInitialPeriods();
  //   this.updateNextPeriod();
  //   this.periodForm.reset({
  //     price: '',
  //     distiDiscount: '',
  //   });
  //   this.updateNextPeriod();
  //   console.log('Form cancelled and reset.');
  // }
}
