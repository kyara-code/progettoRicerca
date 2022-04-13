import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//come nel corso... da cambiare con autenticazione al server in seguito
//fake an authentication with a real server

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

  token;

  isAuthenticated() {
    const promise = new Promise((resolve, rejects) => {
      resolve(this.loggedIn);
    });
    return promise;
  }

<<<<<<< HEAD
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
=======
  logIn(email: string, password: string) {
    this.http
      .post('http://localhost:3000/auth/login', {
        user: email,
        password: password,
      }) // aggiungo qua la chiamata al service per il login
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/admin-search']);
          this.loggedIn = true;
        },
        error: (errorRes) => {
          this.router.navigate(['/error']);
          this.error = errorRes.error;
          console.log(errorRes.error);
        },
      });
>>>>>>> 7a6323070496021d3e54ea55e94bca8b47117a17
  }
}
