import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CloudLicenceDto, MigrateLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CloudService {
    private baseUrl = 'https://192.168.99.76:7070/api/cloud/';

    constructor(private http: HttpClient) { }

    subscripeDevice(Dto: CloudLicenceDto): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'subscripe-plan', Dto, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    renewalDevice(Dto: CloudLicenceDto): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'renewal-plan', Dto, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    upgradeDevice(Dto: CloudLicenceDto): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'upgrade-plan', Dto, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    migratePlan(Dto: MigrateLicenceDto): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'migrate-plan', Dto, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }
}
