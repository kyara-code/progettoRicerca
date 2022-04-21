import { Subscription } from 'rxjs';
import { localService } from './../local.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebPage } from 'src/app/model/page.model';
import { HttpRequestsService } from 'src/app/service/http-requests.service';
import { PagesManagerService } from 'src/app/service/pages-manager.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit, OnDestroy {
  arrayPages: WebPage[] = [];
  searchInput = '';
  subscribe: Subscription;
  subscribe2: Subscription;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagesService: PagesManagerService,
    public httpReq: HttpRequestsService,
    public local: localService
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
              this.local.pages = response;
              this.arrayPages = response;
            });
          this.local.currentPath =
            '/admin-search/' + params['searchInput'] + '/' + params['id'];
        } else {
          let newstr = <string>str;
          newstr = newstr.slice(0, n - 1);
          newstr = newstr + '3';
          this.subscription = this.httpReq
            .onSearchWithParams(this.httpReq.searchInput + newstr)
            .subscribe((response) => {
              this.local.pages = response;
              this.arrayPages = response;
            });
          this.local.currentPath =
            '/admin-search/' + params['searchInput'] + '/' + newstr;
          this.router.navigate([
            '/admin-search/' + this.httpReq.searchInput + '/' + newstr,
          ]);
        }
      }
    });

    this.subscribe = this.pagesService.newSection.subscribe(
      (pagesOfThisSection) => {
        this.local.pages = pagesOfThisSection;
        this.arrayPages = this.local.pages;
      }
    );
  }

  onDelete(idPage: number, i: number) {
    this.local.onDelete(idPage, i);
  }

  onModify(idPage: number, page: WebPage) {
    this.local.onModify(idPage, page);
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
