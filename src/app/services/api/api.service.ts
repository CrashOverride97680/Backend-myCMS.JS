import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { accessLoginInterface } from '../../pages/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService
{

  constructor(
    private http: HttpClient
  ) { }

// LOGIN USER
  login(
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

// LOGOUT USERS
  logout(
    token: string
  )
  {
    const url = `${environment.loginEntrypoint}/login`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .post(url, {
          headers: {
            authorization: token
          }
        });
      resolve(true);
    });
  }

}
