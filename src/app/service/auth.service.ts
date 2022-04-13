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

  token;

  isAuthenticated() {
    const promise = new Promise((resolve, rejects) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  logIn(user: string, password: string) {
    this.http.post(
      'http://localhost:3000/auth/login',
      {
        user: user,
        password: password,
      },
    ).subscribe((response) => {
      this.token = response;
      console.log(this.token)
  });
}

  logOut() {
    this.loggedIn = false;
  }
}
