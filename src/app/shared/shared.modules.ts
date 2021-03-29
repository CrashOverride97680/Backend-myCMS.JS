import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContainerFluidComponent} from './components/container-fluid/container-fluid.component';
import {RowComponent} from './components/row/row.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ContainerFluidComponent,
    RowComponent
  ],
  exports: [
    RowComponent,
    ContainerFluidComponent
  ]
})
export class SharedModules {}
