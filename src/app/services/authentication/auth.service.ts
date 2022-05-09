import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';

// User interface
export class User {
  name: String;
  email: String;
  password: String;
  password_confirmation: String
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  api_url = localStorage.getItem('api_url');
  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://'+this.api_url+'/api/auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://'+this.api_url+'/api/auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://'+this.api_url+'/api/auth/user-profile');
  }

  

}