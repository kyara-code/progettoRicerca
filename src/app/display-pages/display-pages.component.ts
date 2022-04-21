import { Subscription } from 'rxjs';
import { HttpRequestsService } from './../service/http-requests.service';
import { WebPage } from './../model/page.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-display-pages',
  templateUrl: './display-pages.component.html',
  styleUrls: ['./display-pages.component.css'],
})
export class DisplayPagesComponent implements OnInit, OnDestroy {
  arrayPages: WebPage[] = [];
  searchInput = '';
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    public httpReq: HttpRequestsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.httpReq.searchInput = params['searchInput'];
      this.httpReq.getReqCounter = 0;
      this.httpReq.determineSections();

      let str = params['id'];
      if (str) {
        let n = str.length;
        let lastChar = str[n - 1];
        if (lastChar !== '0') {
          this.subscription = this.httpReq
            .onSearchWithParams(this.httpReq.searchInput + str)
            .subscribe((response) => {
              this.arrayPages = response;
            });
        } else {
          let newstr = <string>str;
          newstr = newstr.slice(0, n - 1);
          newstr = newstr + '3';
          this.subscription = this.httpReq
            .onSearchWithParams(this.httpReq.searchInput + newstr)
            .subscribe((response) => {
              this.arrayPages = response;
            });
          this.router.navigate([
            '/admin-search/' + this.httpReq.searchInput + '/' + newstr,
          ]);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
