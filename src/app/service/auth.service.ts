import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//come nel corso... da cambiare con autenticazione al server in seguito
//fake an authentication with a real server

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;

  constructor(private http: HttpClient) {}

  isAuthenticated() {
    const promise = new Promise((resolve, rejects) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  logIn(email: string, password: string) {
    return this.http.post(
      'http://localhost:3000/auth/login',
      {
        email: email,
        password: password,
      }
      // {
      //   headers: new HttpHeaders({ Authorization: 'Bearer' }),
      // }
    );
  }

  logOut() {
    this.loggedIn = false;
  }
}
