import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {
// SET VARIABLE INTERFACE
  public htmlContent: string;
  public lang: string;
  public title: string;
  public type: string;
  public description: string;
  public important: string;
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
  onSubmit(): void {
    console.log("TEST");
  }

  constructor() {
    this.lang = '-';
  }

  ngOnInit(): void {
  }

}
