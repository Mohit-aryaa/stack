import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  filterOpen: boolean = false;
  isLogin:boolean = false
  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token')
    if(token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
      
    }
  }

  openFilter() {
    this.filterOpen = !this.filterOpen;
    if(this.filterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  

  seeQuestions() {
    if(!this.isLogin) {
      this._snackBar.open('Please login to see your questions', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return
    }
  }

  askQuestion() {
    if(!this.isLogin) {
      this._snackBar.open('Please login to ask questions', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return
    }
  }

}
