import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpRequestsService } from './../../service/http-requests.service';
import { PagesManagerService } from './../../service/pages-manager.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  array = [];
  // pageNumber: number;
  currentClient: string;
  pageLimit = 3;

  subscribe: Subscription = null;

  constructor(
    private pagesService: PagesManagerService,
    public httpReq: HttpRequestsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.httpReq.pageLimitChanged.subscribe((newLimit) => {
      this.pageLimit = newLimit;
    });
    let sections;
    this.httpReq.updateSections.subscribe((number) => {
      sections = +number;
      console.log('Section: ' + sections);
      this.array = _.range(sections);
      console.log(this.array);
    });

    this.currentClient = this.pagesService.currentClient;
  }

  onPrevious() {
    if (this.httpReq.pageNumber > 1) {
      this.httpReq.pageNumber = this.httpReq.pageNumber - 1;
      console.log('pageNumber onPrevious = ' + this.httpReq.pageNumber);
      console.log('getReqCounter = ' + this.httpReq.getReqCounter);
      this.subscribe = this.httpReq.searchPage().subscribe((response) => {
        this.pagesService.pages = response;
        this.pagesService.newSection.next(this.pagesService.pages);
      });
    }
  }

  onNext() {
    if (this.httpReq.pageNumber < this.httpReq.getReqCounter) {
      this.httpReq.pageNumber = this.httpReq.pageNumber + 1;
      console.log('pageNumber onNext = ' + this.httpReq.pageNumber);
      console.log('getReqCounter = ' + this.httpReq.getReqCounter);
      this.subscribe = this.httpReq.searchPage().subscribe((response) => {
        this.pagesService.pages = response;
        this.pagesService.newSection.next(this.pagesService.pages);
      });
    }
  }

  onChangePage(number: number) {
    this.httpReq.pageNumber = number + 1;

    this.subscribe = this.httpReq.searchPage().subscribe((response) => {
      this.pagesService.pages = response;
      this.pagesService.newSection.next(this.pagesService.pages);
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
