import { HttpRequestsService } from './http-requests.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
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

  token: AuthResponse = null;

  tokenExpirationTimer: any;
  accessToken: string = null;

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated() {
    const promise = new Promise((resolve, rejects) => {
      resolve(this.loggedIn);
    });
    return promise;
  }

  logIn(user: string, password: string) {
    this.http
      .post<AuthResponse>('http://localhost:3000/auth/login', {
        user: user,
        password: password,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.accessToken = response.access_token;
          this.router.navigate(['/admin-search']);
          this.loggedIn = true;
          // Imposto una stringa nel localStorage
          localStorage.setItem('token', JSON.stringify(response));
          this.autoLogout(response.tokenExpireIn);
        },
        error: (errorRes) => {
          this.router.navigate(['/error']);
          this.error = errorRes.error;
          console.log(errorRes.error);
        },
      });
  }

  autoLogin() {
    // Verifico se sono già loggato oppure no
    this.token = JSON.parse(localStorage.getItem('token'));
    if (this.token !== null) {
      if (this.token.tokenExpireIn > 0) {
        this.loggedIn = true;
        this.autoLogout(this.token.tokenExpireIn);
      } else {
        return;
      }
    } else {
      return;
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.token = null;
    this.loggedIn = false;
    // Imposto la stringa salvata nel localStorage come falsa
    localStorage.setItem('token', null);
    if (this.tokenExpirationTimer) {
      // clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
    // this.tokenExpirationTimer = null;
  }
}
