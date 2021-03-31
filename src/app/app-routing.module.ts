import { NgModule, Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexLoginComponent} from './modules/index-login/pages/login/index-login.component';
const routes: Routes =
[
  { path: '', component: IndexLoginComponent},
  { path: 'login', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
