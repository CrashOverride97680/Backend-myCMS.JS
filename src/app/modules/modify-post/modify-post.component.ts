import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {HttpService} from '../../core/http/http.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.scss']
})
export class ModifyPostComponent implements OnInit {
// SET VARIABLE INTERFACE
  public htmlContent: string = '';
  public lang: string = '-';
  public title: string;
  public type: string = '-';
  public description: string;
  public important: any = '-';
  public category: string;
  public visibility: boolean;
  public listCategory: any;
  public checkData: boolean = false;
  public seo: any;
  public catSend: any;
  public id: string;
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
// CHECK INTERFACE
  public requiredNotInsertHtmlContent: boolean = false;
  public requiredNotInsertLang: boolean = false;
  public requiredNotInsertTitle: boolean = false;
  public requiredNotInsertType: boolean = false;
  public requiredNotInsertDescription: boolean = false;
  public requiredNotInsertImportant: boolean = false;
  public requiredNotInsertCategory: boolean = false;
  public btnLoading: boolean = false;
// FUNTIONS INTERFACE
  close(): void {
    this.checkData = true;
    setTimeout(() => this.checkData = false, 1000);
  }

  onSubmit(contentExec, contentNotExec): void {

    this.btnLoading = true;
    const token = localStorage.getItem('token');
    this.seo = {
      description: this.description
    };
    this.catSend = {
      codeCategory: this.category
    };
    this.requiredNotInsertLang = false;
    this.requiredNotInsertType = false;
    this.requiredNotInsertTitle = false;
    this.requiredNotInsertDescription = false;
    this.requiredNotInsertHtmlContent = false;
    this.requiredNotInsertImportant = false;
    this.requiredNotInsertCategory = false;
    this.requiredNotInsertLang = false;
    this.requiredNotInsertType = false;
    this.requiredNotInsertTitle = false;
    this.requiredNotInsertDescription = false;
    this.requiredNotInsertHtmlContent = false;
    this.requiredNotInsertImportant = false;
    this.requiredNotInsertCategory = false;

    if (this.lang == '-')
      this.requiredNotInsertLang = true;
    if (this.type == '-')
      this.requiredNotInsertType = true;
    if (this.title == '' || this.title == undefined)
      this.requiredNotInsertTitle = true;
    if (this.description == '' || this.description == undefined)
      this.requiredNotInsertDescription = true;
    if (this.htmlContent == '')
      this.requiredNotInsertHtmlContent = true;
    if (this.important == '-')
      this.requiredNotInsertImportant = true;
    if (this.category == '-')
      this.requiredNotInsertCategory = true;

    if (
      this.requiredNotInsertLang == false &&
      this.requiredNotInsertType == false &&
      this.requiredNotInsertTitle == false &&
      this.requiredNotInsertDescription == false &&
      this.requiredNotInsertHtmlContent == false &&
      this.requiredNotInsertImportant == false &&
      this.requiredNotInsertCategory == false
    ) {
      this
        .api
        .createpost(
          token,
          this.lang,
          this.type,
          this.title,
          this.seo,
          this.htmlContent,
          this.important,
          this.visibility,
          this.catSend
        )
        .then(value => {
          this.modalService.open(contentExec, {centered: true});
          this.btnLoading = false;
          this.lang = '-';
          this.category = '-';
          this.important = '-';
          this.lang = '-';
          this.type = '';
          this.title = '';
          this.description = '';
          this.htmlContent = '';
          this.important = '-';
          this.visibility = false;
          this.catSend = '-';
          this.type = '-';
        })
        .catch(error => {
          this.modalService.open(contentNotExec, {centered: true});
          this.btnLoading = false;
        });
    }
    else
      setTimeout(() => {
        this.btnLoading = false;
      }, 500);
  }

  public removePost(modal): void {
    const token = localStorage.getItem('token');
    this
      .api
      .removePost(token, this.id)
      .then(data => {
        this.modalService.dismissAll(modal);
        window.close();
      })
      .catch(err => {
        console.log(err);
        this.modalService.dismissAll(modal);
      });
  }

  public Open(content): void {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    // READ ROUTE
    this.id = this.route.snapshot.params.id;
  }

  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private api: HttpService,
    private modalService: NgbModal,
    private route: ActivatedRoute
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
