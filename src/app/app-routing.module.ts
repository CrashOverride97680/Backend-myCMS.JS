import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLoginComponent } from './pages/index-login/index-login.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
const routes: Routes =
[
  { path: '', component: IndexLoginComponent },
  { path: 'login', redirectTo: ''},
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
