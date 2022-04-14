import { HttpRequestsService } from './../../service/http-requests.service';
import { PagesManagerService } from './../../service/pages-manager.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  numberOfPages: number = 9;
  array = [];
  howManyPagesDisplayed: number = 3;

  constructor(
    private pagesService: PagesManagerService,
    private httpReq: HttpRequestsService
  ) {}

  ngOnInit(): void {
    // this.numberOfPages = this.pagesService.pages.length;
    // let sections = Math.ceil(this.numberOfPages / this.howManyPagesDisplayed);
    let sections;
    this.httpReq.updateSections.subscribe((number) => {
      // Qui section non deve essere uguale a number, perché number è il numero di pagine visibili per sezione
      // section = numeroTotalePagineDelGet / numeroPagineVisibiliPerSezione
      sections = number;
      console.log(sections);
      this.array = _.range(sections);
      console.log(this.array);
    });
  }

  onPrevious() {
    this.httpReq.pageNumber = this.httpReq.pageNumber - 1;
    this.httpReq.searchPage().subscribe((response) => {
      this.pagesService.pages = response;
      this.pagesService.newSection.next(this.pagesService.pages);
    });
  }

  onNext() {
    this.httpReq.pageNumber = this.httpReq.pageNumber + 1;
    this.httpReq.searchPage().subscribe((response) => {
      this.pagesService.pages = response;
      this.pagesService.newSection.next(this.pagesService.pages);
    });
  }

  onChangePage(number: number) {
    this.httpReq.pageNumber = number + 1;

    this.httpReq.searchPage().subscribe((response) => {
      this.pagesService.pages = response;
      this.pagesService.newSection.next(this.pagesService.pages);
    });
  }
}
