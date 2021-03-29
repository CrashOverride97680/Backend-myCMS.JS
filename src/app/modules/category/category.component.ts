import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../core/http/http.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public categoryData: any = '--';
  public categoryVisibleData: any = '--';
  public categoryUnvisibleData: any = '--';
  public categorys: any = [];
  public categoriesorig: any = [];
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
      name: {
        title: 'NAME'
      },
      description: {
        title: 'DESCRIPTION'
      },
      updated: {
        title: 'DD/MM/YYYY'
      },
      actions: {
        title: 'ACTIONS',
        type: 'html',
        filter: false,
        sort: false,
        valuePrepareFunction: (cel, row) => {
          return `<span></span><a href="/modifyPosts/${row._id}" title="modify ${row.title}" target="_blank">Modify</a> / <a href="/deletePosts/${row._id}" title="delete ${row._id}">Delete</a></span>`
        }
      }
    }
  };

  constructor(
    private api: HttpService
  ) {
    const token = localStorage.getItem('token');
    Promise
      .all([
        this.api.getAllNumberCategory(token),
        this.api.getAllCategories(token)
      ])
      .then(value => {
        this.categoryData = value[0];
        this.categoriesorig = value[1];
        this.categorys = this.categoriesorig.map(el => {
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
