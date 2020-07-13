import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLoginComponent } from './pages/index-login/index-login.component';

const routes: Routes =
[
  { 
    path: '', 
    component: IndexLoginComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
