import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';import { SigninService } from 'src/app/services/signin.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm:any = FormGroup;
  signUpForm:any = FormGroup;
  showSignUp:any = 100 + '%' ; 
  showSignInForm:boolean = true;
  showSignUpForm:boolean = false;
  avatar: any = File;
  constructor(
    private formBuilder:FormBuilder,
    private signInService: SigninService,
    private signUpService: SignupService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['',[Validators.required]]
    });
    this.signUpForm = this.formBuilder.group({
      name : ['', [Validators.required]],
      email: ['', [Validators.required]],
      password:['', [Validators.required]],
      designation: ['', [Validators.required]]
    })
  }
  setSignUp() {
    var doc:any  = document.getElementById("formWrapper");
    doc.style.top = 100 + "%";
    this.showSignInForm = true;
    this.showSignUpForm = false;
  }

  isLogin:boolean = false;
  signIn() {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.invalid) {
      console.log(this.signInForm.value);
      this._snackBar.open('All fields are required', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return ;
    }
    this.isLogin = true;
    this.signInService.signIn(this.signInForm.value).subscribe((res:any) => {
      console.log(res);
      this.isLogin = false;
      this._snackBar.open(res.msg, '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      if(res.success == 1) {
        if(res.token !== undefined) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('email', this.signInForm.value.email)
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
      
    }, (errors:any) => {
      this.isLogin = false;
      console.log(errors)
      this._snackBar.open('Error', '', {
        duration: 2000,
        verticalPosition: 'top',
      });
    });
  }

  showPreview:boolean = false;
  showPreviewUrl:any = '';
  selectImage(event:any) {
    this.showPreview = true;
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
          this.showPreviewUrl = e.target.result;
      };
    }
    this.avatar = event.target.files[0];
  }

  selectAvatar() {
    let event:any = document.getElementById("avatar")
    event.click();
  }

  isSignUp: boolean = false
  signUp() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) {
      this._snackBar.open('All field are required', '', {
          duration: 2000,
          verticalPosition: 'top',
      });
      return ;
   }
   this.isSignUp = true;
    const formData = new FormData();
    console.log('this.avatar', this.showPreviewUrl)
    formData.append('avatar', this.avatar);
    formData.append('name', this.signUpForm.value.name);
    formData.append('email', this.signUpForm.value.email);
    formData.append('password', this.signUpForm.value.password);
    formData.append('designation', this.signUpForm.value.designation);
    console.log('formdata',formData)
    this.signUpService.signUp(formData).subscribe((res:any) => {
      console.log(res);
      this.isSignUp = false;
      this.showPreview = false;
      this.showPreviewUrl = '';
        this._snackBar.open(res.msg, '', {
          duration: 1000,
          verticalPosition: 'top',
      });
      this.signUpForm.reset();
    }, (errors:any) => {
      this.isSignUp = false;
      //console.log(errors)
      this._snackBar.open(errors.error.msg, '', {
        duration: 2000,
        verticalPosition: 'top',
      });
    });
  }
  


}
