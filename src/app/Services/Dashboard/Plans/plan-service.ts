import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanDto } from '../../../Models/Plan/plan.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  // private url = 'http://localhost:44397/api/users/';
  // private url = 'http://localhost:5011/api/users/';
  private url = 'http://192.168.99.98/frc/api/plan/';
  constructor(private _client: HttpClient) { }

  getPlans(pageNumber = 1, pageSize = 10): Observable<any> {
    return this._client.get<any>(this.url + 'data-table', {
      params: {
        pageNumber,
        pageSize,
        // loggedEmail: 'test@email.com', // or get from auth context
      },
    });
  }


  // GetDataTable(): Observable<any> {
  //   return this._client.post<any>(this.url + 'data-table', {
  //     headers: { 'Content-Type': 'application/json' },
  //     observe: 'response',
  //   });
  // }

  AddPlan(PlanDto: PlanDto): Observable<any> {
    return this._client.post<any>(this.url + 'add-plan', PlanDto, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response',
    });
  }
}
