import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostsService } from 'src/app/services/posts.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.scss']
})
export class MyQuestionsComponent implements OnInit {


  posts: any = [];
  checkToken: any;
  collection: any = [];
  pageNumber: any;
  itemsPerPage = 4;
  totalItems: any;
  imagePrefxeUrl:any = `${environment.apiUrl}/uploads/`;

  constructor(
    private postsService: PostsService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.checkToken = localStorage.getItem('token');
    let email = localStorage.getItem('email')
    this.route.queryParams.subscribe((params: any) => {
      if (this.pageNumber == params.page) {
          if(this.pageNumber == undefined) {
            this.getPosts()
          }
      } else if (params.page) {
        this.pageNumber = params.page;
        this.pageChanged(params.page);
        return;
      }
      else {
        this.pageNumber = 1;
        this.getPosts()
      }
    });
  }

  isLoading:boolean=true;
  getPosts() {
    let data: any = {
      id: localStorage.getItem('email'),
      page: 1,
      itemsPerPage: this.itemsPerPage
    }
    this.postsService.getPosts(data).subscribe((res: any) => {
      this.isLoading = false;
      this.collection = res.data;
      this.totalItems = res.total;
      setTimeout(() => {
        for (let index = 0; index < this.collection.length; index++) {
          let element = this.collection[index];
          let btnId = 'likeBtn' + element.post_id;
          let likeBtn: any = document.getElementById(btnId);
          if (element.liked) {
            likeBtn.setAttribute("color", "primary")
            likeBtn.classList.add('mat-primary')
          }
        }
      }, 500);
    }, (errors: any) => {
      console.log(errors)
      this.isLoading = false;
    })
  }



  pageChanged(page: any) {
    this.isLoading = true;
    this.router.navigate(['my-questions'], { queryParams: { page: page } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let data: any = {
      id: localStorage.getItem('email'),
      page: page,
      itemsPerPage: this.itemsPerPage
    }
    this.postsService.getMyQuestion(data).subscribe((res: any) => {
      this.isLoading = false;
      this.collection = res.data;
      this.totalItems = res.total;
      setTimeout(() => {
        for (let index = 0; index < this.collection.length; index++) {
          let element = this.collection[index];
          let btnId = 'likeBtn' + element.post_id;
          let likeBtn: any = document.getElementById(btnId);
          if (element.liked) {
            likeBtn.setAttribute("color", "primary")
            likeBtn.classList.add('mat-primary')
          }
        }
      }, 500);
    }, (errors: any) => {
      this.isLoading = false;
      console.log(errors)
    })
  }

  likePost(event: any) {
    if (this.checkToken == null) {
      this._snackBar.open('Please login to like post', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return
    }
    let data: any = {
      question_id: event,
      email: localStorage.getItem('email')
    }
    this.postsService.likePost(data).subscribe((res: any) => {
      if (res.success == 1) {
        let id = 'like' + event;
        let like: any = document.getElementById(id)
        like.innerHTML = res.likes;
        let btnId = 'likeBtn' + event
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
