import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  public postsorig: any = [];
  public settings: any = {
    hideSubHeader: false,
    actions: false,
    attr: {
      class: 'table table-font'
    },
    columns: {
      _id: {
        title: 'ID',
        show: false,
        sort: false,
      },
      type: {
        title: 'TYPE'
      },
      title: {
        title: 'TITLE',
        sort: false,
      },
      visible: {
        title: 'VIEW',
        filter: false,
        type: 'html',
        valuePrepareFunction: (cel, row) => {
          return `${row.visible == true ? '&#10003;' : '&#10007;'}`
        }
      },
      updated: {
        title: 'DD/MM/YYYY',
        filter: false,
        sort: false,
      },
      actions: {
        title: 'ACTIONS',
        type: 'html',
        filter: false,
        sort: false,
        valuePrepareFunction: (cel, row) => {
          return `<span class="d-block"><a href="/modifyPost/${row._id}" title="modify ${row.title}" target="_blank" class="btn btn-warning btn-sm d-block text-light text-decoration-none"><strong>Modify</strong></a></span>`
        }
      }
    }
  };
  public removeRowState: boolean = false;
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
        this.postsorig = value[3];
        this.posts = this.postsorig.map(el => {
          let data = el;
          let day = data.updated.split("T")[0].split("-")[2];
          let mounth = data.updated.split("T")[0].split("-")[1];
          let year = data.updated.split("T")[0].split("-")[0];
          data.updated =  `${day}/${mounth}/${year}`;
          return data;
        });
      });
  }

  ngOnInit(): void {
  }

}
