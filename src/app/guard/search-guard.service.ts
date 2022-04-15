import { PagesManagerService } from './../service/pages-manager.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable()
export class SearchGuard implements CanActivate {
  constructor(private router: Router, private pages: PagesManagerService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.pages.hasSearched().then((hasSearched: boolean) => {
    //   if (!hasSearched) {
    //     this.router.navigate(['/search']);
    //   } else {
    //     return true;
    //   }
    // });
    if (this.pages.hasSearched()) {
      return this.pages.hasSearched();
    } else {
      this.router.navigate(['/search']);
    }
  }
}
