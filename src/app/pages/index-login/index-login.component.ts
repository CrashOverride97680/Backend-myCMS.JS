import { Component, OnInit } from '@angular/core';
// IMPORT INTERFACES
import { accessLoginInterface } from '../interfaces/login.interface';
// IMPORT SERVICES
import { LoginService } from './login.service';
@Component({
  selector: 'app-index-login',
  templateUrl: './index-login.component.html',
  styleUrls: ['./index-login.component.scss']
})
export class IndexLoginComponent implements OnInit 
{
  public email: String;
  public password: String;
  public session: Boolean;

  constructor(
    private http: LoginService
  ) 
  {
    this.email = '';
    this.password = '';
    this.session = false;
  }

  onSubmit(): void {
    this.http.sendDataLogin(this.email, this.password);
  }

  ngOnInit(): void { }
  
}
