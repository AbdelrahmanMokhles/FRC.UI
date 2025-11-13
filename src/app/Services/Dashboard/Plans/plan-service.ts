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
  private baseUrl = 'http://192.168.99.98/frc/api/plan/';
  constructor(private http: HttpClient) { }

  getPlans(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'data-table', {});
  }

  getPlanById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get-by-id/${id}`);
  }

  updatePlan(id: number, dto: PlanDto) {
    return this.http.put<any>(`${this.baseUrl}update-plan/${id}`, dto);
  }


  AddPlan(PlanDto: PlanDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'add-plan', PlanDto, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response',
    });
  }
}
