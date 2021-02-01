import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:8080";
  signUpPath = "signup";

  constructor(public http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(`${this.baseUrl}/${this.signUpPath}`,{
      email: email,
      password: password
    });
  }

}
