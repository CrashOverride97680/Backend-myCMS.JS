import { Component, OnInit } from '@angular/core';
// IMPORT INTERFACES
import { accessLoginInterface } from '../interfaces/login.interface';
// IMPORT SERVICES
import { LoginService } from './login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index-login',
  templateUrl: './index-login.component.html',
  styleUrls: ['./index-login.component.scss']
})
export class IndexLoginComponent implements OnInit
{
  public email: string;
  public password: string;
  public session: boolean;

  constructor(
    private http: LoginService,
    private route: Router
  )
  {
    this.email = '';
    this.password = '';
    this.session = false;
  }

  onSubmit(): void {
    this.http.sendDataLogin(this.email, this.password);
    this
      .route
      .navigate(['/', 'admin-panel']);
  }

  ngOnInit(): void { }

}
