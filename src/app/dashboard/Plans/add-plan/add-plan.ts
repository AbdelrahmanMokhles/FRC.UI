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



@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.html',
  styleUrl: './add-plan.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddPlan implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _planService: PlanService,
  ) { }

  planForm!: FormGroup;
  addPeriodForm!: FormGroup;

  ngOnInit() {
    this.planForm = this.fb.group({
      planName: ['Startup', Validators.required],
      concurrentCalls: [2, [Validators.required, Validators.min(1)]],
      period: [12, [Validators.required, Validators.min(1)]],
      periods: this.fb.array([]),
      internalNote: ['']
    });

    this.addPeriodForm = this.fb.group({
      period: [1, [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      distiDiscount: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.addInitialPeriods();
    this.updateNextPeriod();
  }

  addInitialPeriods() {
    const initialPeriods: PlanPeriod[] = [
      { period: 1, price: 99, distiDiscount: 25 },
      { period: 2, price: 180, distiDiscount: 20 },];
    initialPeriods.forEach((p) => {
      this.periods.push(this.createPeriodGroup(p));
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
    if (this.addPeriodForm.valid) {
      this.periods.push(this.createPeriodGroup(this.addPeriodForm.value));
      this.addPeriodForm.reset({
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
    this.addPeriodForm.patchValue({ period: nextPeriod });
  }

  save() {

    if (this.planForm.valid) {
      const planDto: PlanDto = this.planForm.value;

      console.log('✅ Plan DTO ready to send:', planDto);
      this._planService.AddPlan(planDto).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      console.error('Form is invalid.');
      alert('Please fill out all required fields correctly.');
      this.planForm.markAllAsTouched();
    }
  }

  cancel() {
    this.periods.clear();
    this.planForm.reset({
      planName: 'Startup',
      concurrentCalls: 4,
      period: 12,
      internalNote: '',
    });
    this.addInitialPeriods();
    this.updateNextPeriod();
    this.addPeriodForm.reset({
      price: '',
      distiDiscount: '',
    });
    this.updateNextPeriod();
    console.log('Form cancelled and reset.');
  }
}
