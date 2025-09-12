import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
    private url = "https://localhost:44397/api/Users/";
    // private url = "http://192.168.99.126/frc/api/Users/";
    constructor(private _client : HttpClient)
    {
    }
    private email!: string;

    setEmail(email: string) {
      this.email = email;
      // console.log('📩 [UserService] Email set:', this.email);
    }

    getEmail() {
      return this.email;
      // console.log('📩 [UserService] EmailGot:', this.email);
    }

    
    
    Profile(token:any) : Observable<any>{
      return this._client.post<any>(this.url+"GetbyToken",token,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response'  
      });
    }

    GetByEmail(em:any) : Observable<any>{
      return this._client.post<any>(this.url+"GetbyEmail",em,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response'  
      });
    }

    RegisterUser(user: any): Observable<any> {
      return this._client.post<any>(this.url+"Register", user,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      });
    };

    UpdateUser(user: any): Observable<any> {
      return this._client.put<any>(this.url+"updateuser", user,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      });
    };

    
    DeleteUser(email: string): Observable<any> {
      // return this._client.delete<any>(this.url+"DeleteUser/"+email)};
      return this._client.delete<any>(`${this.url}DeleteUser/${email}`)};
    
    ForgotPassword(model: any): Observable<any> {
      return this._client.post<any>(this.url+"ForgotPassword", model,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      });
    };
    ResetPassword(model: any): Observable<any> {
      return this._client.post<any>(this.url+"ResetPassword", model,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      });
    };

    VerifyEmail(otp:any):Observable<HttpResponse<any>>{
        return this._client.post<any>(this.url+"Verify-otp", otp,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      }
    )
    };

    ResendOtp(email:any):Observable<any>{
        return this._client.post<any>(this.url+"Resend-otp", email,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      }
    )
    };
    
    Signin(user:any):Observable<any>{
        return this._client.post<any>(this.url+"Login", user,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      }
    )
    };

}

