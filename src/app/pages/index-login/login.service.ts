import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
// CALL ASYNC
  constructor(private http: HttpClient) { }

  sendDataLogin(mail:String, pass: String)
  {
    return this.http.post(environment.loginEntrypoint,
    {
      mail,
      pass
    }
    .subscribe(
      data => console.log("DATA", data),
      error => console.log("ERROR", error)
    );
  }
}
