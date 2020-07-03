import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
// CALL ASYNC
  constructor(private http: HttpClient) { }

  async sendDataLogin(mail:String, pass: String) {
    return await this.http.post(environment.loginEntrypoint)
  }
}
