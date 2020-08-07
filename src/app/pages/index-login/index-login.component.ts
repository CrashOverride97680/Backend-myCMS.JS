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
  public checkData: boolean;
  public toast: any = {
    classElement: 'bg-danger text-light toast'
  };

  constructor(
    private http: LoginService,
    private route: Router
  )
  {
    this.email = '';
    this.password = '';
    this.checkData = false;
  }

  close() {
    this.checkData = true;
    setTimeout(() => this.checkData = false, 1000);
  }

  onSubmit(): void {
    this
      .http
      .sendDataLogin(this.email, this.password)
      .then(success =>
      {
        if(success)
        {
          this
            .route
            .navigate(['/', 'dashboard']);
        }
      })
      .catch(success =>
      {
        if(!success) {
          this.checkData = true;
        }
      });
  }

  ngOnInit(): void {
    const token: string = localStorage.getItem('token');
    if(!token)
      localStorage.clear();
    else
      this
        .route
        .navigate(['/', 'dashboard']);
  }

}
