import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPlanDto } from '../../../Models/Plan/plan.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private baseUrl = 'http://192.168.99.98/frc/api/plan/';
  constructor(private http: HttpClient) { }

  getPlans(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'data-table', {});
  }

  getActivePlans(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'active-plans', {});
  }

  getPlanById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get-by-id/${id}`);
  }



  AddPlan(AddPlanDto: AddPlanDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'add-plan', AddPlanDto, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response',
    });
  }

  archivePlan(id: number) {
    return this.http.put<any>(`${this.baseUrl}archive-plan/${id}`, null);
  }

  updatePlan(id: number, dto: AddPlanDto) {
    return this.http.put<any>(`${this.baseUrl}update-plan/${id}`, dto);
  }
}
