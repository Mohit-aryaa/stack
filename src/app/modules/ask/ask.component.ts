import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {
  questionForm:any = FormGroup;
  email:any;
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.questionForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      question: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }

  get title() { return this.questionForm.get('title'); }
  get question() { return this.questionForm.get('question'); }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
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
      ['bold', 'italic'],
      ['fontSize']
    ]
  };


  submit() {
    //this.isLogin = true;
    if (this.questionForm.invalid) {
      console.log(this.questionForm.value);
      this._snackBar.open('All fields are required', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return ;
    }
    this.postsService.askQuestion(this.questionForm.value).subscribe((res:any) => {
     if(res.success == 1 ) {
      this.questionForm.reset()
     }
      this.questionForm.patchValue({
        email: localStorage.getItem('email')
      })
      this._snackBar.open(res.msg, '', {
        duration: 1000,
        verticalPosition: 'top',
      });
    },(errors:any) => {
      this._snackBar.open('Error', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
    })
  }

}
