import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostsService } from 'src/app/services/posts.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../../shared/ckeditor-adapter-base64';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {
  questionForm:any = FormGroup;
  email:any;
  public Editor = ClassicEditor;

  editorConfig = {
    extraPlugins: [MyCustomUploadAdapterPlugin, ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private postsService: PostsService,
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
