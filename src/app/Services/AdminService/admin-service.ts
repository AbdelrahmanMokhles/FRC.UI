import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private url = 'https://localhost:44397/api/admin/';
    // private url = 'http://192.168.99.126/frc/api/admin/';
    constructor(private _client: HttpClient) {}

    GetAllUsers() {
        return this._client.get(this.url);
    }

    GetUsersOnly() {
        return this._client.get(this.url + 'get-users-only');
    }

    EditUser(user: any): Observable<any> {
        return this._client.put<any>(this.url + 'edit-user', user, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    ChangePassword(model: any): Observable<any> {
        return this._client.post<any>(this.url + 'change-password', model, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    DeleteSelected(emailsList: string[]): Observable<any> {
        return this._client.post<any>(
            this.url + 'delete-selected',
            emailsList,
            {
                headers: { 'Content-Type': 'application/json' },
                observe: 'response',
            }
        );
    }

    ChangeStatus(model: any): Observable<any> {
        return this._client.post<any>(this.url + 'change-status', model, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }
}
