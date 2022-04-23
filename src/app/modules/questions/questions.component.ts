import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  imagePrefxeUrl:any = `${environment.apiUrl}/uploads/`;
  htmlContent: any = undefined;
  addAnswer:boolean = false;
  checkToken:any;
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private _snackBar: MatSnackBar,
    private changeDetectionRef: ChangeDetectorRef,
  ) { }

  

  ngOnInit(): void {
    this.checkToken = localStorage.getItem('token');
    this.getPosts();
    setTimeout(() => {
      this.getSubmittedAnswers();
    }, 500);
  }

  post:any = []
  getPosts() {
    console.log(this.route.snapshot.paramMap)
    let slug = this.route.snapshot.paramMap.get("slug");
    let email = localStorage.getItem('email')
    this.postService.getPostbyId(slug, email).subscribe((res:any) => {
      console.log('response', res)
      this.post = res;
      setTimeout(() => {
        for (let index = 0; index < this.post.length; index++) {
          let element = this.post[index];
          let btnId = 'likeBtn'+element.post_id;
          let likeBtn:any = document.getElementById(btnId);
          if(element.liked) {
            likeBtn.setAttribute("color", "primary")
            likeBtn.classList.add('mat-primary')
          } 
        }
      }, 500);
    }, (errors:any) => {
      
    })
  }

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

  showAnswerBox() {
    let localItem= localStorage.getItem("token");
    if(localItem!== null) {
      this.addAnswer =true;
      setTimeout(() => {
        window.scrollTo(0,document.body.scrollHeight);
      }, 10);
    } else {
      this.addAnswer = false;
      this._snackBar.open('Please sign in to add answer', '', {
        duration: 2000,
        verticalPosition: 'top',
      });
    }
  }

  submittedAnswers:any = [];
  submitAnswer() {
    if(this.htmlContent !== undefined) {
      let email = localStorage.getItem('email');
      let data:any = {
        slug: this.route.snapshot.paramMap.get("slug"),
        answer: this.htmlContent,
        email: email
      }

      this.postService.submitAnswers(data).subscribe((res:any) => {
        this._snackBar.open(res.msg, '', {
          duration: 2000,
          verticalPosition: 'top',
        });
        if(res.success == 1) {
          this.htmlContent = undefined;
          this.addAnswer = false;
          this.isAnswersLoading = true;
          let ans:any = document.getElementById('totalAnswers');
          ans.innerHTML  = res.totalAnswers;
          setTimeout(() => {
            this.getSubmittedAnswers()
          }, 500);
        }
      }, (errors:any) => {
        this._snackBar.open('Error', '', {
          duration: 2000,
          verticalPosition: 'top',
        });
      })
    }
 
  }

  isAnswersLoading:boolean = true;
  getSubmittedAnswers() {
    let email:any = localStorage.getItem('email');
    let slug:any = this.route.snapshot.paramMap.get("slug");
    this.postService.getSubmittedAnswers(slug, email).subscribe((res:any) => {
        this.submittedAnswers = res;
        this.isAnswersLoading =false;
        console.log(this.submittedAnswers);
        setTimeout(() => {
          for (let index = 0; index < this.submittedAnswers.length; index++) {
            const element = this.submittedAnswers[index];
            let id = 'likeAnswer' + element.id;
            let answerlike: any = document.getElementById(id);
            answerlike.innerHTML = element.answerlikes;
            let btnId = 'answerLikeBtn' + element.id;
            let likeBtn: any = document.getElementById(btnId);
            if (element.liked) {
              likeBtn.setAttribute("color", "primary")
              likeBtn.classList.add('mat-primary')
            } else {
              likeBtn.setAttribute("color", "white")
              likeBtn.classList.remove('mat-primary')
            }
          }
        }, 1000);
    }, (errors:any) => {
      this._snackBar.open('Error', '', {
        duration: 2000,
        verticalPosition: 'top',
      });
    })
  }


  likePost(event:any) {
    if(this.checkToken == null) {
      this._snackBar.open('Please login to like post', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return
    }
    let data:any = {
      question_id : event,
      email: localStorage.getItem('email')
    }
    console.log(data)
    this.postService.likePost(data).subscribe((res:any)=> {
      
      if(res.success == 1) {
        let id = 'like'+event;
        let like:any = document.getElementById(id)
        like.innerHTML = res.likes;
        let btnId = 'likeBtn'+event
        let likeBtn:any = document.getElementById(btnId);
        if(res.liked) {
          likeBtn.setAttribute("color", "primary")
          likeBtn.classList.add('mat-primary')
        } else {
          likeBtn.setAttribute("color", "white")
          likeBtn.classList.remove('mat-primary')
        }
      }
    }, (errors:any) => {
      this._snackBar.open('Error', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
    })
  }

  likeAnswer(event: any) {
    if (this.checkToken == null) {
      this._snackBar.open('Please login to like answer', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return
    }
    let data: any = {
      answer_id: event,
      email: localStorage.getItem('email')
    }
    this.postService.likeAnswer(data).subscribe((res: any) => {
      console.log(res)
      if (res.success == 1) {
        let id = 'likeAnswer' + event;
        let like: any = document.getElementById(id)
        like.innerHTML = res.likes;
        let btnId = 'answerLikeBtn' + event
        let likeBtn: any = document.getElementById(btnId);
        if (res.liked) {
          likeBtn.setAttribute("color", "primary")
          likeBtn.classList.add('mat-primary')
        } else {
          likeBtn.setAttribute("color", "white")
          likeBtn.classList.remove('mat-primary')
        }
      }
    }, (errors: any) => {
      this._snackBar.open('Error', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
    })
  }

}
