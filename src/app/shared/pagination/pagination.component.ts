import { interval, Subscription } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';
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
  currentClient: string;
  pageLimit = '3';

  subscribe1: Subscription;
  subscribe2: Subscription;
  subscribe3: Subscription;
  subscribe4: Subscription;

  constructor(
    private pagesService: PagesManagerService,
    private route: ActivatedRoute,
    public httpReq: HttpRequestsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let str = params['id'];
      if (str) {
        let n = str.length;
        let lastChar = str[n - 1];
        if (lastChar !== '0') {
          this.httpReq.pageLimit = lastChar;
        }
      }
    });

    this.httpReq.determineSections();
    let sections;
    this.subscribe1 = this.httpReq.updateSections.subscribe((number) => {
      sections = +number;
      this.array = _.range(sections);
      this.httpReq.getReqCounter = number;
    });

    this.currentClient = this.pagesService.currentClient;
  }

  onPrevious() {
    if (this.httpReq.pageNumber > 1) {
      this.httpReq.pageNumber = this.httpReq.pageNumber - 1;
      this.subscribe2 = this.httpReq.searchPage().subscribe((response) => {
        this.pagesService.pages = response;
        this.pagesService.newSection.next(this.pagesService.pages);
      });
    }
  }

  onNext() {
    if (this.httpReq.pageNumber < this.httpReq.getReqCounter) {
      this.httpReq.pageNumber = this.httpReq.pageNumber + 1;
      this.subscribe3 = this.httpReq.searchPage().subscribe((response) => {
        this.pagesService.pages = response;
        this.pagesService.newSection.next(this.pagesService.pages);
      });
    }
  }

  onChangePage(number: number) {
    this.httpReq.pageNumber = number + 1;

    this.subscribe4 = this.httpReq.searchPage().subscribe((response) => {
      this.pagesService.pages = response;
      this.pagesService.newSection.next(this.pagesService.pages);
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe1) {
      this.subscribe1.unsubscribe();
    }
    if (this.subscribe2) {
      this.subscribe2.unsubscribe();
    }
    if (this.subscribe3) {
      this.subscribe3.unsubscribe();
    }
    if (this.subscribe4) {
      this.subscribe4.unsubscribe();
    }
  }
}
