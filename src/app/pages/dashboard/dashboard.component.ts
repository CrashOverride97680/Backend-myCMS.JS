import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
// INTERFACE
interface postsInterface {
  title: string;
  type: string;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public postsData: number = 160;
  public mailsubData: number = 800;
  public chatData: string = "12.500";
  public paymentsData: string = "10.500";
  public socialExist: boolean = true;
  public earningExist: boolean = false;
  // Array of different segments in chart
  lineChartData: ChartDataSets[] = [
    { data: [ 0, 10000, 5000, 20000, 10000, 15000, 30000, 17500, 35000, 40000 ], label: 'Earnings' }
  ];

  //Labels shown on the x-axis
  lineChartLabels: Label[] = ['Jan', 'Mar', 'May', 'June', 'Jul', 'Sept', 'Nov'];

  // Define chart options
  lineChartOptions: ChartOptions = {
    responsive: true,
    legend: { display: false }
  };

  // Define colors of chart segments
  lineChartColors: Color[] = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.1)',
      borderColor: 'rgba(78,115,222,1)',
    }
  ];

  // Set true to show legends
  lineChartLegend = true;

  // Define type of chart
  lineChartType = 'line';

  lineChartPlugins = [];

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // Doughnut
  public doughnutChartLabels: Label[] = ['Twitter', 'Facebook', 'Instagram'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  // Define chart options
  doughnutChartOptions: ChartOptions = {
    responsive: true
  };

  public posts: postsInterface[] = [
    {
      title: 'Test page for studies component table',
      type: 'Post electronics',
      date: '10/08/2017'
    },
    {
      title: ' 2 Test page for studies component table',
      type: 'Post electronics',
      date: '10/08/2018'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
