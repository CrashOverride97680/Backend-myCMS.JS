import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../http/http.service';
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
  public dataLogout: boolean = false;
// FUNCTION OBJECT
  public invertCollpaseJobBoard($event): void {
    $event.preventDefault();
//  LOCAL VARIABLE
    this.isCollapseJobBoard = !this.isCollapseJobBoard;
    this.isCollpseUtilities = false;
    this.isCollapseChart = false;
    this.isCollapseAdd = false;
    this.rotateJobBoard = this.isCollapseJobBoard ? 90 : 0;
    this.rotateToolbox = 0;
    this.rotateChart = 0;
    this.rotateAdd = 0;
    this.dataJobsBoard = !this.dataJobsBoard;
    this.dataDashboard = false;
    this.dataUtilities = false;
    this.dataChart = false;
    this.dataAdd = false;

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
    this.dataUtilities = !this.dataUtilities;
    this.dataJobsBoard = false;
    this.dataDashboard = false;
    this.dataChart = false;
    this.dataAdd = false;
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
    this.dataChart = !this.dataChart;
    this.dataJobsBoard = false;
    this.dataDashboard = false;
    this.dataUtilities = false;
    this.dataAdd = false;
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
    this.dataAdd = !this.dataAdd;
    this.dataJobsBoard = false;
    this.dataDashboard = false;
    this.dataUtilities = false;
    this.dataChart = false;
  }

  public logoutUser($event): void {
    $event.preventDefault();
    this
      .http
      .logout(localStorage.getItem('token'))
      .then(success => {
        if(success) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      });
  }

  public closeAll(): void {
    this.isCollapseAdd = false;
    this.isCollapseJobBoard = false;
    this.isCollpseUtilities = false;
    this.isCollapseChart = false;
    this.rotateJobBoard = 0;
    this.rotateToolbox = 0;
    this.rotateChart = 0;
    this.rotateAdd = 0;
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
    private router: Router,
    private http: HttpService
  ) { }

// INIT COMPONENT
  ngOnInit(): void {
  }

}
