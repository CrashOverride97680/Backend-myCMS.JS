import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
