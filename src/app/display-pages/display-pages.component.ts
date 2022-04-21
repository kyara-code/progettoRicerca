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
        let numberOfPages = str[n - 10];
        console.log(numberOfPages);
        if (lastChar !== '0') {
          if (numberOfPages <= this.httpReq.getReqCounter) {
            this.subscription = this.httpReq
              .onSearchWithParams(this.httpReq.searchInput + str)
              .subscribe((response) => {
                this.arrayPages = response;
              });
            this.router.navigate([
              '/search/' + this.httpReq.searchInput + '/' + params['id'],
            ]);
          } else {
            let newstr = '&_page=1&_limit=' + lastChar;
            this.subscription = this.httpReq
              .onSearchWithParams(this.httpReq.searchInput + newstr)
              .subscribe((response) => {
                this.arrayPages = response;
              });
            this.router.navigate([
              '/search/' + this.httpReq.searchInput + '/' + newstr,
            ]);
          }
        } else {
          if (numberOfPages <= this.httpReq.getReqCounter) {
            let newstr = '&_page=' + numberOfPages + '&_limit=3';
            this.subscription = this.httpReq
              .onSearchWithParams(this.httpReq.searchInput + newstr)
              .subscribe((response) => {
                this.arrayPages = response;
              });
            this.router.navigate([
              '/search/' + this.httpReq.searchInput + '/' + newstr,
            ]);
          } else {
            let newstr = '&_page=1&_limit=3';
            this.subscription = this.httpReq
              .onSearchWithParams(this.httpReq.searchInput + newstr)
              .subscribe((response) => {
                this.arrayPages = response;
              });
            this.router.navigate([
              '/search/' + this.httpReq.searchInput + '/' + newstr,
            ]);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
