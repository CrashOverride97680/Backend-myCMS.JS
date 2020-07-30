import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.scss']
})

export class LeftbarComponent implements OnInit {

// VARIABLE OBJECT
  public isCollapseJobBoard: boolean = false;
  public isCollpseUtilities: boolean = false;
  public isCollapseChart: boolean = false;
  public isCollapseAdd: boolean = false;

// FUNCTION OBJECT
  public invertCollpaseJobBoard($event): void {
    $event.preventDefault();
    this.isCollapseJobBoard = !this.isCollapseJobBoard;
    this.isCollpseUtilities = false;
    this.isCollapseChart = false;
    this.isCollapseAdd = false;
  }

  public invertCollapseUtilities($event): void {
    $event.preventDefault();
    this.isCollpseUtilities = !this.isCollpseUtilities;
    this.isCollapseJobBoard = false;
    this.isCollapseChart = false;
    this.isCollapseAdd = false;
  }

  public invertCollapseChart($event): void {
    $event.preventDefault();
    this.isCollapseChart = !this.isCollapseChart;
    this.isCollapseJobBoard = false;
    this.isCollpseUtilities = false;
    this.isCollapseAdd = false;
  }

  public invertCollapseAdd($event): void {
    $event.preventDefault();
    this.isCollapseAdd = !this.isCollapseAdd;
    this.isCollapseJobBoard = false;
    this.isCollpseUtilities = false;
    this.isCollapseChart = false;
  }

// INPUT VARIABLES
  @Input() dataActiveDashboard: boolean = false;
  @Input() dataActiveJobBoard: boolean = false;
  @Input() dataActiveUtilities: boolean = false;
  @Input() dataActiveChart: boolean = false;
  @Input() dataActiveAdd: boolean = false;
  @Input() dataActiveDarkMode: boolean = false;
  @Input() dataActiveCloseCollapse: boolean = false;

// CONSTRUCTOR
  constructor() { }

// INIT COMPONENT
  ngOnInit(): void {
  }

}
