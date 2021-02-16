import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/User';

interface LoginResponse {
  authenticationToken: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:8080";
  private signUpPath = "api/auth/registration";
  private loginPath = "api/auth/login"

  user = new BehaviorSubject<User>(null);

  constructor(public http: HttpClient, private router: Router) { }

  signUp(username: string, email: string, password: string) {
    return this.http.post<string>(`${this.baseUrl}/${this.signUpPath}`, {
      'username': username,
      'email': email,
      'password': password
    })
      .pipe(catchError(errorRes => {
        let errorMessage = "An unknown Error occured.";
        if (!errorRes.error || errorRes.error.errorInfo) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.errorInfo) {
          case 'EMAIL_TAKEN':
            errorMessage = "This E-mail address is already taken.";
          case 'USERNAME_TAKEN':
            errorMessage = "This Username ist already taken."
        }
        return throwError(errorMessage);

      }));
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/${this.loginPath}`, {
      'username': username,
      'password': password
    })
      .pipe(tap(res => this.handleAuthentication(res.username, res.authenticationToken)));
  }

  handleAuthentication(username: string, token: string) {
    const user = new User(username, token);
    this.user.next(user);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/'])
  }

}
