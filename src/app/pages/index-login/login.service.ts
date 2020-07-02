import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  async sendDataLogin(mail:String, pass: String) {
    return await this.http.post()
  }

  constructor(private http: HttpClient) { }
}
