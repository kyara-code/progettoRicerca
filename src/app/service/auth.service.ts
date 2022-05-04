import { HttpRequestsService } from './http-requests.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';

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
  autoExit = new Subject<void>();

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
      .post<AuthResponse>('https://yootta-server.herokuapp.com/auth/login', {
        user: user,
        password: password,
      })
      .subscribe({
        next: (response) => {
          this.accessToken = response.access_token;
          this.router.navigate(['/admin-search']);
          this.loggedIn = true;
          localStorage.setItem('token', JSON.stringify(response));
          this.autoLogout(response.tokenExpireIn);
        },
        error: (errorRes) => {
          this.router.navigate(['/error']);
          this.error = errorRes.error;
        },
      });
  }

  autoLogin() {
    this.token = JSON.parse(localStorage.getItem('token'));

    if (this.token !== null) {
      this.accessToken = this.token.access_token;
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
    let time = expirationDuration - new Date().getTime();
    this.tokenExpirationTimer = setTimeout(() => {
      this.autoExit.next();
      this.logout();
    }, time);
  }

  logout() {
    this.token = null;
    this.loggedIn = false;
    localStorage.setItem('token', null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
}
