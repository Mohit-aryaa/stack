import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  token:any;
  isLogin:any;
  signedIn:boolean;
  constructor(
    private _snackBar: MatSnackBar
  ) {
    let localItem= localStorage.getItem("token");
    this.isLogin = localStorage.getItem("email");
    if(localItem!== null) {
      this.signedIn =true;
    } else {
      this.signedIn = false;
    }
  }

  ngOnInit(): void {

  }
  navbarShow:boolean = false;
  toggleNavbar() {
    this.navbarShow = !this.navbarShow;
    if(this.navbarShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  showSignInform() {
    this.navbarShow = false;
    var doc:any  = document.getElementById("formWrapper");
    doc.style.top = "0";
  }

  signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
  }

  profile() {
    if(!this.isLogin) {
      this._snackBar.open('Please login to see your questions', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return
    }
  }

}
