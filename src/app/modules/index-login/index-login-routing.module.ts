import {RouterModule, Routes} from '@angular/router';
import {IndexLoginComponent} from './pages/login/index-login.component';
import {NgModule} from '@angular/core';
const routes: Routes = [
  {
    path: '',
    component: IndexLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IndexLoginRoutingModule {}
