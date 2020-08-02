import { Component, OnInit, Input } from '@angular/core';
import { LeftbarStatesService as LeftbarState } from '../../services/states components/leftbar-states.service';

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
  public rotateJobBoard: number = 0;
  public rotateToolbox: number = 0;
  public rotateChart: number = 0;
  public rotateAdd: number = 0;
  public dataDashboard: boolean = false;
  public dataJobsBoard: boolean = false;
  public dataUtilities: boolean = false;
  public dataChart: boolean = false;
  public dataAdd: boolean = false;

// FUNCTION OBJECT
  public invertCollpaseJobBoard($event): void {
    $event.preventDefault();
    this.isCollapseJobBoard = !this.isCollapseJobBoard;
    this.isCollpseUtilities = false;
    this.isCollapseChart = false;
    this.isCollapseAdd = false;
    this.rotateJobBoard = this.isCollapseJobBoard ? 90 : 0;
    this.rotateToolbox = 0;
    this.rotateChart = 0;
    this.rotateAdd = 0;
  }

  public invertCollapseUtilities($event): void {
    $event.preventDefault();
    this.isCollpseUtilities = !this.isCollpseUtilities;
    this.isCollapseJobBoard = false;
    this.isCollapseChart = false;
    this.isCollapseAdd = false;
    this.rotateToolbox = this.isCollpseUtilities ? 90 : 0;
    this.rotateJobBoard = 0;
    this.rotateChart = 0;
    this.rotateAdd = 0;
  }

  public invertCollapseChart($event): void {
    $event.preventDefault();
    this.isCollapseChart = !this.isCollapseChart;
    this.isCollapseJobBoard = false;
    this.isCollpseUtilities = false;
    this.isCollapseAdd = false;
    this.rotateJobBoard = 0;
    this.rotateToolbox = 0;
    this.rotateChart = this.isCollapseChart ? 90 : 0;
    this.rotateAdd = 0;
  }

  public invertCollapseAdd($event): void {
    $event.preventDefault();
    this.isCollapseAdd = !this.isCollapseAdd;
    this.isCollapseJobBoard = false;
    this.isCollpseUtilities = false;
    this.isCollapseChart = false;
    this.rotateJobBoard = 0;
    this.rotateToolbox = 0;
    this.rotateChart = 0;
    this.rotateAdd = this.isCollapseAdd ? 90 : 0;
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
  constructor(
    private state: LeftbarState,
  ) { }

// INIT COMPONENT
  ngOnInit(): void {
  }

}
