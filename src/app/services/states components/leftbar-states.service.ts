  import {Injectable, Input} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeftbarStatesService {

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
  public isActiveDashboard: boolean = false;
  public isActiveJobBoard: boolean = false;
  public isActiveUtilities: boolean = false;
  public isActiveChart: boolean = false;
  public isActiveAdd: boolean = false;
  public isActiveDarkMode: boolean = false;
  public isActiveCloseCollapse: boolean = false;

// CONSTRUCTOR
  constructor() { }
}
