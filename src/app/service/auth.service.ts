//come nel corso... da cambiare con autenticazione al server in seguito
//fake an authentication with a real server
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, rejects) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }
}
