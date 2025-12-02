import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CloudLicenceDto } from '../../../Models/PBXDevice/PBXDevice.models';

@Injectable({
    providedIn: 'root',
})
export class LicenceService {
    private baseUrl = 'https://192.168.99.76:7070/api/pbxdevice/';
    constructor(private http: HttpClient) { }

    getLicenses(): Observable<any> {
        return this.http.get<any>(this.baseUrl + 'data-table', {});
    }

    getLicenceById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}get-by-id/${id}`);
    }

    getLicenceByMac(mac: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}search-by-mac`, { params: { mac } });
    }

    subscripe(dto: CloudLicenceDto): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}subscripe`, dto);
    }
}
