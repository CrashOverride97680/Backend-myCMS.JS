import { Component } from '@angular/core';
@Component({
  selector: 'app-index-login',
  templateUrl: './index-login.component.html',
  styleUrls: ['./index-login.component.scss']
})
export class IndexLoginComponent {
  /* email: string;
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
  }*/

}
