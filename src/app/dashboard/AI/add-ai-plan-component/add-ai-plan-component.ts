import { Component, OnInit } from '@angular/core';
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
import * as yup from 'yup';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { YupValidator } from '../../../Validators/Yup-Validator/yup-validator';
import { ToastService } from '../../../Services/Common/toast-service';

@Component({
  selector: 'app-add-ai-plan-component',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-ai-plan-component.html',
  styleUrl: './add-ai-plan-component.scss'
})
export class AddAiPlanComponent {
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


  aiplanSchema = yup.object({
    aiPlanName: yup.string().required('Plan name is required'),
    minutes: yup.number().typeError('Must be number').required('Minutes field is required').min(1, 'Must be at least 1'),
    price: yup.number().required('Price field is required').min(1, 'Must be at least 1'),
  });


  ngOnInit() {
    this.planForm = this.fb.group({
      aiPlanName: ['', Validators.required],
      minutes: [, [Validators.required, Validators.min(1)]],
      price: [, [Validators.required, Validators.min(1)]],
    });
    this.planForm.valueChanges.subscribe(async (values) => {
      await YupValidator(values, this.aiplanSchema, this.planFormErrors);
    });
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true;
        this.planId = +params['id'];
        this.loadPlanForEdit(this.planId);
        this.planForm.get('isArchived')?.enable();
      }
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
          isArchived: plan.isArchived,
          periods: plan.periods
        });
        if (this.isArchived) {
          this.planForm.disable();
        }
      },
      error: (err) => console.error('❌ Failed to load plan:', err)
    });
  }

  onArchiveToggle() {
    this.isArchived = !this.isArchived;
    // const archived = this.planForm.get('isArchived')?.value;
    if (this.isArchived) {
      this.planForm.disable();
      this.planForm.get('isArchived')?.enable();
      // this.planForm.get('saveBtn')?.enable();
      this.changeArchiveStatus();
    }
    else {
      this.changeArchiveStatus();
      this.planForm.enable();
    }
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

  changeArchiveStatus() {
    if (this.planId) {
      this._planService.archivePlan(this.planId).subscribe({
        next: (res) => {
          this._toast.show("✅ Success", res.message);
          // setTimeout(() => {
          //   this._router.navigate(['/dashboard/plans/plans-list']);
          // }, 1000);
        },
        error: (err) => console.error(err)
      });
    }
  }

  save() {
    if (this.planForm.valid) {
      this.AddPlanDto = this.planForm.value;
      console.log("adasdsd", this.AddPlanDto);
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
      this._toast.show("Error", 'Please fill out all required fields correctly.');
      this.planForm.markAllAsTouched();
    }
  }

}
