import { Component, OnInit } from '@angular/core';
// IMPORT INTERFACES
import { loginForm } from '../interfaces/login.interface';
@Component({
  selector: 'app-index-login',
  templateUrl: './index-login.component.html',
  styleUrls: ['./index-login.component.scss']
})
export class IndexLoginComponent implements OnInit {

  public loginData: loginForm =
  {
    email: "",
    session: false,
    debug: true
  }

  public sessionSave(value:boolean){
    this.loginData.session = value;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
