import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  api :string = `${environment.apiUrl}/signupapi.php` ;
  constructor(
    private http: HttpClient
  ) { }

  signUp(payload:any)  {
    return this.http.post(`${this.api}?method=signUp`, payload);
  }

  update(payload:any)  {
    return this.http.post(`${this.api}?method=update`, payload);
  }
}
