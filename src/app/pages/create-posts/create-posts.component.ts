import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from '../../services/api/api.service';
import { GetAllCategoryInterface } from '../interfaces/getAllCategory.interface';
import {SeosemCreatePostsInterfaces} from "../interfaces/seosemCreatePosts.interfaces";
@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
// SET VARIABLE INTERFACE
  public htmlContent: string;
  public lang: string = '-';
  public title: string;
  public type: string = '-';
  public description: string;
  public important: ( number | string ) = '-';
  public category: string;
  public visibility: boolean;
  public listCategory: any;
  public checkData: boolean = false;
  public toast: any = {
    classElement: 'bg-danger text-light toast'
  };
  public editorConfig: AngularEditorConfig =
  {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '50vh',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'fontName',
        'strikeThrough',
        'subscript',
        'superscript'
      ],
      [
        'fontSize',
        'insertHorizontalRule',
        'textColor',
        'backgroundColor'
      ]
    ]
  };
// FUNTIONS INTERFACE
  close(): void {
    this.checkData = true;
    setTimeout(() => this.checkData = false, 1000);
  }

  onSubmit(): void {
    const token = localStorage.getItem('token');
    let seo = {
      description: this.description
    };
    console.log("HTML:", this.htmlContent);
    this
      .api
      .createpost(
        token,
        this.lang,
        this.type,
        this.title,
        seo,
        this.htmlContent,
        this.important,
        this.visibility,
        {
          codeCategory: this.category
        }
      )
      .then(value => {
        console.log("SENDING!!");
      })
      .catch(error => console.log("ERROR:", error));
  }

  ngOnInit(): void {
  }

  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private api: ApiService
  ) {
  // FETCH DATA BEFORE INIZIALIZE
    const token = localStorage.getItem('token');
    Promise
      .all([
        this.api.getAllCategories(token),
      ])
      .then(value => {
        this.listCategory = value[0];
      });
  // SETTING VARIABLE DEFAULT
    this.lang = '-';
    this.category = '-';
    this.important = '-';
  }

}
