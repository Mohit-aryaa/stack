import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  api :string = `${environment.apiUrl}/signinapi.php` ;
  constructor(
    private http: HttpClient
  ) { }

  signIn(payload:any)  {
    return this.http.post(`${this.api}?method=signIn`, payload);
  }

  getUserDetails(id:any) {
    return this.http.get(`${this.api}?method=userData&id=${id}`);
  }
}