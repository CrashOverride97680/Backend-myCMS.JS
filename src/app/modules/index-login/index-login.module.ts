import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModules} from '../../shared/shared.modules';
import {RightboxComponent} from './components/rightbox/rightbox.component';
import {FormComponent} from './components/form/form.component';
import {LeftboxComponent} from './components/leftbox/leftbox.component';
import {SpinnerComponent} from '../../core/spinner/spinner.component';
import {IndexLoginRoutingModule} from './index-login-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModules,
    IndexLoginRoutingModule
  ],
  declarations: [
    RightboxComponent,
    FormComponent,
    LeftboxComponent,
    FormComponent,
    SpinnerComponent
  ]
})
export class IndexLoginModule {}
