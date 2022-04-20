import { Subscription } from 'rxjs';
import { localService } from './../local.service';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesManagerService,
    private httpReq: HttpRequestsService,
    private local: localService
  ) {}

  ngOnInit(): void {
    console.log('display is alive');
    this.route.params.subscribe((params: Params) => {
      this.httpReq.searchInput = params['searchInput'];
      this.httpReq.getReqCounter = 0;
      this.httpReq.determineSections();

      this.local.currentPath =
        '/admin-search/' + params['searchInput'] + '/' + params['id'];

      let url = params['searchInput'] + params['id'];

      console.log('url: ' + url);
      console.log('currentpath: ' + this.local.currentPath);
      this.httpReq.onSearchWithParams(url).subscribe((response) => {
        this.local.pages = response;
        this.arrayPages = this.local.pages;
        console.log(response);
      });
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
