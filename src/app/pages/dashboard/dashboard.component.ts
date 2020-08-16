import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { postsInterface } from '../interfaces/posts.interface';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public postsData: any = '--';
  public mailsubData: any = '--';
  public chatData: any = '--';
  public paymentsData: any = '--';
  public postsCards: boolean = true;
  public mailsubCards: boolean = true;
  public chatCards: boolean = true;
  public paymentsCards: boolean = true;
  public posts: any = [];

  constructor(
    private api: ApiService
  ) {
    const token = localStorage.getItem('token');
    Promise
      .all([
        this.api.getNumPosts(token),
        this.api.getNumMailSub(token),
        this.api.getNumChat(token),
        this.api.getNumPay(token),
        this.api.getPostsByMaxNumber(token, 5)
      ])
      .then(value => {
        this.postsData = value[0];
        this.mailsubData = value[1];
        this.chatData = value[2];
        this.paymentsData = value[3];
        this.posts = value[4];
      });
  }

  ngOnInit(): void {
  }

}
