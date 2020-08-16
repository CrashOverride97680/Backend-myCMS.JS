import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public postsData: any = '--';
  public postsVisibleData: any = '--';
  public postsUnvisibleData: any = '--';
  public posts: any = [];

  constructor(
    private api: ApiService
  ) {
    const token = localStorage.getItem('token');
    Promise
      .all([
        this.api.getNumPosts(token),
        this.api.getVisiblePostNumber(token),
        this.api.getUnvisiblePostNumber(token)
      ])
      .then(value => {
        this.postsData = value[0];
        this.postsVisibleData = value[1];
        this.postsUnvisibleData = value[2];
      });
  }

  ngOnInit(): void {
  }

}
