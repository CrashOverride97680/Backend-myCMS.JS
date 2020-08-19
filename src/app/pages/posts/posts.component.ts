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
  public settings: any = {
    hideSubHeader: false,
    actions: false,
    attr: {
      class: 'table'
    },
    columns: {
      _id: {
        title: 'ID',
        show: false
      },
      type: {
        title: 'TYPE'
      },
      title: {
        title: 'TITLE'
      },
      visible: {
        title: 'VISIBLE',
        filter: false
      },
      dateUser: {
        title: 'GG/MM/AAAA'
      },
      actions: {
        title: 'ACTIONS',
        type: 'html',
        filter: false,
        sort: false,
        valuePrepareFunction: (cel, row) => {
          return `<a href="/modifyPosts/${row._id}" title="modify ${row.title}" target="_blank">Modify / Delete</a>`
        }
      }
    }
  };

  constructor(
    private api: ApiService
  ) {
    const token = localStorage.getItem('token');
    Promise
      .all([
        this.api.getNumPosts(token),
        this.api.getVisiblePostNumber(token),
        this.api.getUnvisiblePostNumber(token),
        this.api.getAllPostsTable(token)
      ])
      .then(value => {
        this.postsData = value[0];
        this.postsVisibleData = value[1];
        this.postsUnvisibleData = value[2];
        this.posts = value[3];
      });
  }

  ngOnInit(): void {
  }

}
