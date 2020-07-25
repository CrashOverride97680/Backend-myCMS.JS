import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    public router: Router
  ) { }

  canActivate(): any {
    try {
      const jwtHelper = new JwtHelperService();
      const token = localStorage.getItem('token');
      const auth: boolean = jwtHelper.decodeToken(token).auth;
      const admin: boolean = jwtHelper.decodeToken(token).admin;
      if (admin && auth)
        return true;
    }
    catch (e) {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
}
