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
export class LoginService
{
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
    return new Promise ((resolve, reject) =>
    {
      this.http.post(url ,
      {
        email: mail,
        password: pass
      }).subscribe(
      {
        next(data: accessLoginInterface) {

          const token: string = data.token;
          localStorage.setItem('token', token);
          resolve(true);
        },
        error(msg) {
          console.log('Error message:', msg);
          reject(false);
        }
      });
    });
  }
}
