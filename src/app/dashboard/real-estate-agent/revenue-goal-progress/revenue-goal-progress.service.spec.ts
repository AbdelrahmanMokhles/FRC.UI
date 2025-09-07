import { TestBed } from '@angular/core/testing';

import { RevenueGoalProgressService } from './revenue-goal-progress.service';

describe('RevenueGoalProgressService', () => {
  let service: RevenueGoalProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenueGoalProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
