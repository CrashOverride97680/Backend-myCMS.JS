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
    const url = `${environment.loginEntrypoint}/logout`;
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

// GET NUMBER POSTS
  getNumPosts(
    token: string
  )
  {
    const url = `${environment.loginEntrypoint}/getPostsNumbers`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .get(url, {
          headers: {
            authorization: token
          }
        }).subscribe(
        {
          next(data: { count: number }) {
            resolve(data.count);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }

// GET NUMBER SUBSCRIBE
  getNumMailSub(
    token: string
  )
  {
    const url = `${environment.loginEntrypoint}/getMailSubNumbers`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .get(url, {
          headers: {
            authorization: token
          }
        }).subscribe(
        {
          next(data: { count: number }) {
            resolve(data.count);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }

// GET NUMBER MESSAGE USERS
  getNumChat(
    token: string
  )
  {
    const url = `${environment.loginEntrypoint}/getChatsNumbers`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .get(url, {
          headers: {
            authorization: token
          }
        }).subscribe(
        {
          next(data: { count: number }) {
            resolve(data.count);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }

// GET NUMBER PAYMENTS DATA
  getNumPay(
    token: string
  )
  {
    const url = `${environment.loginEntrypoint}/getEarningNumber`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .get(url,
          {
          headers: {
            authorization: token
          }
        }).subscribe(
        {
          next(data: { count: number }) {
            resolve(data.count);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }

// GET DATA POSTS FOR DASHBOARD
  getPostsByMaxNumber(
    token: string,
    max: number
  ) {
    const url = `${environment.loginEntrypoint}/getPosts/${max}`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .get(url,
          {
            headers: {
              authorization: token
            }
          }).subscribe(
        {
          next(data) {
            resolve(data);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }

// GET NUMBER VISIBLE POSTS
  getVisiblePostNumber(
    token: string,
  ) {
    const url = `${environment.loginEntrypoint}/getVisiblePostNumber`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .get(url,
          {
            headers: {
              authorization: token
            }
          }).subscribe(
        {
          next(data: { count: number}) {
            resolve(data.count);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }

// GET NUMBER UNVISIBLE POSTS
  getUnvisiblePostNumber(
    token: string,
  ) {
    const url = `${environment.loginEntrypoint}/getUnvisiblePostNumber`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .get(url,
          {
            headers: {
              authorization: token
            }
          }).subscribe(
        {
          next(data: { count: number}) {
            resolve(data.count);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }
}
