import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//come nel corso... da cambiare con autenticazione al server in seguito
//fake an authentication with a real server

export class AuthResponse {
  access_token: string;
  refreshToken: string;
  refreshTokenExpireIn: number;
  tokenExpireIn: number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  error = {
    message:
      'An unknown error has occured, looks like you are not on the right page.' +
      'Please consider navigate again on our website through the right routes!',
    status: 'Unknown Route',
  };

  constructor(private http: HttpClient, private router: Router) {}

  token = null;

  isAuthenticated() {
    const promise = new Promise((resolve, rejects) => {
      resolve(this.loggedIn);
    });
    return promise;
  }

  logIn(email: string, password: string) {
    this.http
      .post<AuthResponse>('http://localhost:3000/auth/login', {
        user: email,
        password: password,
      }) // aggiungo qua la chiamata al service per il login
      .subscribe({
        next: (response) => {
          console.log(response);
          this.token = response.access_token;
          this.router.navigate(['/admin-search']);
          this.loggedIn = true;
        },
        error: (errorRes) => {
          this.router.navigate(['/error']);
          this.error = errorRes.error;
          console.log(errorRes.error);
        },
      });
  }
}
