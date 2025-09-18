import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // private url = 'http://localhost:44397/api/users/';
    // private url = 'http://localhost:5011/api/users/';
    private url = 'http://192.168.99.126:80/frc/api/users/';
    constructor(private _client: HttpClient) {}
    private email!: string;
    private token!: string;

    setEmail(email: string) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    Profile(token: any): Observable<any> {
        return this._client.post<any>(this.url + 'profile', token, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
            withCredentials: true,
        });
    }

    GetByEmail(em: any): Observable<any> {
        return this._client.post<any>(this.url + 'get-user-email', em, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    UserData(): Observable<any> {
        const token = this.getToken();
        return this._client.get<any>(this.url + 'get-user-data', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            observe: 'response',
        });
    }

    RegisterUser(user: any): Observable<any> {
        return this._client.post<any>(this.url + 'register', user, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    UpdateUser(user: any): Observable<any> {
        return this._client.put<any>(this.url + 'update-user', user, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    DeleteUser(email: any): Observable<any> {
        // return this._client.delete<any>(this.url+"DeleteUser/"+email)};
        return this._client.post<any>(
            `${this.url}delete-user`,
            JSON.stringify(email),
            {
                headers: { 'Content-Type': 'application/json' },
                observe: 'response',
            }
        );
    }

    ForgotPassword(model: any): Observable<any> {
        return this._client.post<any>(this.url + 'forgot-password', model, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }
    ResetPassword(model: any): Observable<any> {
        return this._client.post<any>(this.url + 'reset-password', model, {
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

    VerifyEmail(otp: any): Observable<HttpResponse<any>> {
        return this._client.post<any>(this.url + 'verify-otp', otp, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    ResendOtp(email: any): Observable<any> {
        return this._client.post<any>(this.url + 'resend-otp', email, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
        });
    }

    Signin(user: any): Observable<any> {
        return this._client.post<any>(this.url + 'login', user, {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
            withCredentials: true,
        });
    }

    Logout(): Observable<any> {
        return this._client.post<any>(this.url + 'logout', {
            headers: { 'Content-Type': 'application/json' },
            observe: 'response',
            withCredentials: true,
        });
    }
}
