import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MyQuestionsComponent } from './my-questions/my-questions.component';
import { ImagefilterPipe } from '../pipe/imagefilter.pipe';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
    SignInComponent,
    HeaderComponent,
    SidebarComponent,
    ImagefilterPipe,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule
  ],
  exports: [
    SignInComponent,
    HeaderComponent,
    SidebarComponent,
    ImagefilterPipe
  ]
})
export class SharedModule { }
