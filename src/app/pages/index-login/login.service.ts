import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { accessLoginInterface } from '../interfaces/login.interface';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
// CALL ASYNC
  constructor(
    private http: HttpClient
  ) { }

  sendDataLogin(
    mail:string,
    pass: string,
    session: boolean = false
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
        next(data: accessLoginInterface) {
          localStorage.setItem('auth', JSON.stringify(data));
        },
        error(msg) {
          console.log('Error message:', msg);
        }

      });
  }
}
