import { Component, OnInit } from '@angular/core';
// IMPORT INTERFACES
import { accessLoginInterface } from '../../../../shared/models/login.interface';
// IMPORT SERVICES
import { HttpService } from '../../../../core/http/http.service';
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
  public spinner: boolean = false;

  constructor(
    private http: HttpService,
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


  ngOnInit(): void {
    this.spinner = false;
    const token: string = localStorage.getItem('token');
    if(!token)
      localStorage.clear();
    else
      this
        .route
        .navigate(['/', 'dashboard']);
  }

}
