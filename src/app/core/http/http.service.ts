import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';
import { accessLoginInterface } from '../../shared/models/login.interface';
import { SeosemCreatePostsInterfaces } from '../../shared/models/seosemCreatePosts.interfaces';
@Injectable({
  providedIn: 'root'
})
export class HttpService
{

  constructor(
    private http: HttpClient
  ) { }

// LOGIN USER
  login(
    mail: string,
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

// GET POSTS FOR TABLE
  getAllPostsTable(
    token: string,
  ) {
    const url = `${environment.loginEntrypoint}/getAllPostsTable`;
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
          next(data: any) {
            resolve(data);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }

// GET ALL CATEGORIES
  getAllCategories(
    token: string
  ) {
    const url = `${environment.loginEntrypoint}/getAllCategory`;
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
          next(data: any) {
            resolve(data);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }
// GET ALL NUMBER CATEGORY
  getAllNumberCategory(
    token: string
  )  {
    const url = `${environment.loginEntrypoint}/getAllNumberCategory`;
    return new Promise ((resolve, reject) =>
    {
      this
        .http
        .get(url ,
        {
          headers: {authorization: token}
        }).subscribe(
        {
          next(data: any) {
            resolve(data.count);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }
// POST CREATE POSTS
  createpost(
    token: string,
    lang: string,
    type: string,
    title: string,
    seo: SeosemCreatePostsInterfaces[],
    content: string,
    important: number,
    visible: boolean,
    category: any[]
  ) {
    const url = `${environment.loginEntrypoint}/createpost`;
    return new Promise ((resolve, reject) =>
    {
      this.http.post(url ,
        {
          lang,
          type,
          title,
          seo,
          content,
          important,
          visible,
          category,
        },
        {
          headers: {authorization: token}
        }).subscribe(
        {
          next(data: any) {
            resolve(true);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }
// POST CREATE CATEGORY
  createcategory(
    token: string,
    name: string,
    titleSeo: string,
    description: string,
    visibility: boolean
  ) {
    const url = `${environment.loginEntrypoint}/createCategory`;
    return new Promise ((resolve, reject) =>
    {
      this.http.post(url ,
        {
          name,
          titleSeo,
          description,
          visibility
        },
        {
          headers: {authorization: token}
        }).subscribe(
        {
          next(data: any) {
            resolve(true);
          },
          error(msg) {
            console.log('Error message:', msg);
            reject(false);
          }
        });
    });
  }

  removePost(
    token: string,
    id: string
  ) {
    const url = `${environment.loginEntrypoint}/deletePosts`;
    return new Promise ((resolve, reject) => {
      this
        .http
        .delete(url,
          {
            params: {id},
            headers: {authorization: token}
          })
        .subscribe(
          {
            next(data: any) {
              resolve(true);
            },
            error(msg) {
              console.log('Error message:', msg);
              reject(false);
            }
          }
        );
    });
  }
}
