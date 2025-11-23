import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpgradeLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private baseUrl = 'http://192.168.99.60/frc/api/cloud/';

  constructor(private http: HttpClient) {

  }

  subscripeDevice(Dto: UpgradeLicenceDto): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'subscripe-plan', Dto, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response',
    });
  }

}
