import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SigninService } from 'src/app/services/signin.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  updateForm:any = FormGroup;
  avatar: any = File;
  constructor(
    private signinService: SigninService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private signUpService: SignupService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.updateForm = this.formBuilder.group({
      name : ['', [Validators.required]],
      email: ['', [Validators.required]],
      password:['', [Validators.required]],
      designation: ['', [Validators.required]]
    })
  }

  userData:any = [];

  getData() {
    let email = localStorage.getItem('email');
    this.signinService.getUserDetails(email).subscribe((res:any) => {
      console.log(res)
      this.userData = res;
    }, (errors:any) => {
      this._snackBar.open('Error', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return
    })
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

  isUpdate:boolean = false;
  

  updateProfile() {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid) {
      this._snackBar.open('All field are required', '', {
          duration: 2000,
          verticalPosition: 'top',
      });
      return ;
   }
   this.isUpdate = true;
    const formData = new FormData();
    let id:any = localStorage.getItem('email');
    console.log('this.avatar', this.showPreviewUrl)
    formData.append('avatar', this.avatar);
    formData.append('id', id);
    formData.append('name', this.updateForm.value.name);
    formData.append('email', this.updateForm.value.email);
    formData.append('password', this.updateForm.value.password);
    formData.append('designation', this.updateForm.value.designation);
    console.log('formdata',formData)
    this.signUpService.update(formData).subscribe((res:any) => {
      console.log(res);
      this.isUpdate = false;
      this.showPreview = false;
      this.showPreviewUrl = '';
        this._snackBar.open(res.msg, '', {
          duration: 1000,
          verticalPosition: 'top',
      });
      this.updateForm.reset();
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        window.location.reload();
      }, 1000);
    }, (errors:any) => {
      this.isUpdate = false;
      //console.log(errors)
      this._snackBar.open(errors.error.msg, '', {
        duration: 2000,
        verticalPosition: 'top',
      });
    });
  }

  openForm() {
    var doc:any  = document.getElementById("formWrapper");
    doc.style.top = 0;
  }

  closeForm() {
    var doc:any  = document.getElementById("formWrapper");
    doc.style.top = 100 + "%";
  }

}
