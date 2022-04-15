import { AuthService } from './auth.service';
import { HttpRequestsService } from './http-requests.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private authService: AuthService) {}

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (userData._tokenExpirationDate) this.authService.loggedIn = true;

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.authService.logout();
    }, expirationDuration);
  }
}
