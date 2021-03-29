import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-container-fluid',
  templateUrl: './container-fluid.component.html',
  styleUrls: ['./container-fluid.component.scss']
})
export class ContainerFluidComponent {
  @Input() class: string;
}
