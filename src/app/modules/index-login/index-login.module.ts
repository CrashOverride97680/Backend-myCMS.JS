import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormComponent} from './components/form/form.component';
import {IndexLoginRoutingModule} from './index-login-routing.module';
import {FormsModule} from "@angular/forms";
import {LeftboxComponent} from './components/leftbox/leftbox.component';
import {RightboxComponent} from './components/rightbox/rightbox.component';
import {IndexLoginComponent} from './pages/login/index-login.component';
import {SharedModule} from '../../shared/shared.modules';
@NgModule({
  declarations: [
    FormComponent,
    LeftboxComponent,
    RightboxComponent,
    IndexLoginComponent
  ],
  imports: [
    CommonModule,
    IndexLoginRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class IndexLoginModule {}
