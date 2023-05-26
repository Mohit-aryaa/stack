import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyQuestionsComponent } from './my-questions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuestionsComponent } from '../questions/questions.component';
import { SharedModule } from '../shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    MyQuestionsComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule.forChild(
      [
        { path: '', component:  MyQuestionsComponent
      }
      ]
    ),
    MatProgressSpinnerModule
  ]
})
export class MyQuestionsModule { }
