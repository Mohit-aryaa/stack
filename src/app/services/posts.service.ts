import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  api :string = `${environment.apiUrl}/postsapi.php` ;
  constructor(
    private http: HttpClient
  ) { }

  //api.instantwebtools.net/v1/passenger?page=${page}&size=${this.itemsPerPage}`
  getPosts(parameter:any): Observable<any>  {
    let params = ' ';
    if(parameter.id) {
      params = `?method=getData&page=${parameter.page}&size=${parameter.itemsPerPage}&userid=${parameter.id}`;
    } else {
      params = `?method=getData&page=${parameter.page}&size=${parameter.itemsPerPage}`;
    }
    return this.http.get(this.api +params);
  }

  getPostbyId(slug:any,userid:any) {
    let params = ' ';
    if(userid) {
      params = `?method=getData&slug=${slug}&userid=${userid}`;
    } else {
      params = `?method=getData&slug=${slug}`;
    }
    return this.http.get(this.api + params);
  }

  submitAnswers(payload:any) {
    return this.http.post(this.api +'?method=submitAnswer', payload);
  }

  getSubmittedAnswers(slug:any, userid:any) {
    let params = ''
    if(userid) {
      params = `?method=getSubmittedAnswers&slug=${slug}&userid=${userid}`
    } else {
      params = `?method=getSubmittedAnswers&slug=${slug}`
    }
    return this.http.get(this.api +params);
  }

  likePost(payload:any) {
    return this.http.post(this.api+ '?method=likePost', payload)
  }

  likeAnswer(payload:any) {
    return this.http.post(this.api+ '?method=likeAnswer', payload)
  }

  askQuestion(payload:any) {
    return this.http.post(this.api+ '?method=askQuestion', payload)
  }

  getMyQuestion(payload:any) {
    return this.http.get(this.api+`?method=getData&page=${payload.page}&size=${payload.itemsPerPage}&userid=${payload.id}`)
  }
}
