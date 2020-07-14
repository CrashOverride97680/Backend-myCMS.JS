import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLoginComponent } from './pages/index-login/index-login.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
const routes: Routes =
[
  { path: '', component: IndexLoginComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
