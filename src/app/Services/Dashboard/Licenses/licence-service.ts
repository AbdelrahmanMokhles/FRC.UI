import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpgradeLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {


  private baseUrl = 'http://192.168.99.98/frc/api/pbxdevice/';
  constructor(private http: HttpClient) { }

  getLicenses(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'data-table', {});
  }

  getLicenceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get-by-id/${id}`);
  }

  subscripe(dto: UpgradeLicenceDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}subscripe`, dto);
  }
}
