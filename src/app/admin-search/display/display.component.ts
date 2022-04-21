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
  sectionNumberMax: number;
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
    this.subscribe = this.pagesService.newSection.subscribe(
      (pagesOfThisSection) => {
        this.local.pages = pagesOfThisSection;
        this.arrayPages = this.local.pages;
      }
    );
    this.route.params.subscribe((params: Params) => {
      this.httpReq.searchInput = params['searchInput'];
      let str = params['id'];
      if (str) {
        let n = str.length;
        let lastChar = str[n - 1];
        let numberOfSection = str[n - 10];
        if (lastChar !== '0') {
          console.log('Ultimo carattere diverso a 0');
          console.log('Numero di sezione scelta: ' + numberOfSection);
          console.log(
            'Numero massimo di sezioni: ' + this.httpReq.getReqCounter
          );
          if (numberOfSection <= this.httpReq.getReqCounter) {
            console.log('Sezione scelta più piccola del massimo consentito');
            this.subscription = this.httpReq
              .onSearchWithParams(this.httpReq.searchInput + str)
              .subscribe((response) => {
                this.local.pages = response;
                this.arrayPages = response;
              });
            this.local.currentPath =
              '/admin-search/' + params['searchInput'] + '/' + params['id'];
            this.router.navigate([
              '/admin-search/' + this.httpReq.searchInput + '/' + params['id'],
            ]);
          } else {
            console.log('Sezione scelta più grande del massimo consentito');
            let newstr = '&_page=1&_limit=' + lastChar;
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
        } else {
          if (numberOfSection <= this.httpReq.getReqCounter) {
            let newstr = '&_page=' + numberOfSection + '&_limit=3';
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
          } else {
            let newstr = '&_page=1&_limit=3';
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
      }
    });
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
