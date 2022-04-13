// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   RouterStateSnapshot,
//   Router,
//   CanActivateChild,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable()
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean | Observable<boolean> | Promise<boolean> {
//     return this.authService.isAuthenticated().then((authenticated: boolean) => {
//       if (authenticated) {
//         return true;
//       } else {
//         this.router.navigate(['/search']);
//       }
//     });
//   }

//   canActivateChild(
//     childRoute: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean | Observable<boolean> | Promise<boolean> {
//     return this.canActivate(childRoute, state);
//   }
// }
