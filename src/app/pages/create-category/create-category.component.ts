import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
// SET VARIABLE INTERFACE
  public name: string;
  public description: string;
  public titleSeo: string;
  public important: string | number = '-';
  public visibility: boolean = false;
  public dangerName: boolean = false;
  public dangerDescription: boolean = false;
  public dangerTitleSeo: boolean = false;
  constructor() { }
  onSubmit(contentExec, contentNotExec): void {

  }
  ngOnInit(): void {
  }

}
