import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
// CALL ASYNC
  constructor(
    private http: HttpClient
  ) { }

  sendDataLogin(
    mail:String, 
    pass: String, 
    session: Boolean = false
  )
  {
    const url = `${environment.loginEntrypoint}/login`;
    this
      .http
      .post(url , {
        email: mail,
        password: pass
      }).subscribe(
      {
        next(data) {
          console.log('DATA:', data);
        },
        error(msg) {
          console.log('Error message:', msg);
        }

      });
  }
}
