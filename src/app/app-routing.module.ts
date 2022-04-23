import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  {path: 'home',  loadChildren: () => import('./modules/index/index.module').then(m=>m.IndexModule)},
  {path: 'home/:page',  loadChildren: () => import('./modules/index/index.module').then(m=>m.IndexModule)},
  {path: 'my-questions',  loadChildren: () => import('./modules//my-questions/my-questions.module').then(m=>m.MyQuestionsModule), canActivate: [AuthGuard]},
  {path: 'ask', loadChildren:() => import('./modules/ask/ask.module').then(m=>m.AskModule), canActivate: [AuthGuard]},
  {path: 'profile', loadChildren:() => import('./modules/my-profile/my-profile.module').then(m=>m.MyProfileModule), canActivate: [AuthGuard]},
  {path: 'questions/:slug', loadChildren:() => import('./modules/questions/questions.module').then(m=>m.QuestionsModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
