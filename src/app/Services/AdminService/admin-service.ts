import { HttpClient , HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private url = "https://localhost:44397/api/Admin/";
    // private url = "http://192.168.99.126/frc/api/Admin/";
    constructor(private _client : HttpClient)
    {
    }

    GetAllUsers(){
      return this._client.get(this.url);
    };
    
    
    GetUsersOnly(){
      return this._client.get(this.url+"GetUsersOnly");
    };

    EditUser(user: any): Observable<any> {
          return this._client.put<any>(this.url+"EditUser", user,
          {
            headers: { "Content-Type": "application/json" },
            observe: 'response' 
          });
        };

    ChangePassword(model: any): Observable<any> {
      return this._client.post<any>(this.url+"ChangePassword", model,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      });
    };

    DeleteSelected(emailsList: string[]): Observable<any> {
      return this._client.post<any>(this.url+"DeleteSelected", emailsList,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      });
    };
    
    ChangeStatus(model: any): Observable<any> {
      return this._client.post<any>(this.url+"ChangeStatus", model,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      });
    };
    
    DisableSelected(emailsList: string[]): Observable<any> {
      return this._client.post<any>(this.url+"DisableSelected", emailsList,
      {
        headers: { "Content-Type": "application/json" },
        observe: 'response' 
      });
    };
}
