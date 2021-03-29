import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { postsInterface } from '../../shared/models/posts.interface';
import { HttpService } from '../../core/http/http.service';

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
  public postsorig: any = [];
  public posts: any = [];

  constructor(
    private api: HttpService
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
        this.postsorig = value[4];
        this.posts = this.postsorig.map(el => {
          let data = el;
          data.updated = data.updated.split("T")[0];
          return data;
        });
      });
  }

  ngOnInit(): void {
  }

}
