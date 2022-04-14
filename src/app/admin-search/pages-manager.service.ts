import { Injectable } from '@angular/core';
import { HttpRequestsService } from './../service/http-requests.service';
import { NgForm } from '@angular/forms';
import { WebPage } from './../model/page.model';
import { Subject } from 'rxjs';

@Injectable()
export class PagesManagerService {
  pages: WebPage[] = [];
  pagesChanged = new Subject<WebPage>();
  pagesModified = new Subject<WebPage[]>();
  isPageModified = false;
  isModify = false;
  newPage: WebPage;
  currentId: number;

  constructor(private httpReq: HttpRequestsService) {}

  onSearch(searchForm: NgForm, idPage: string) {
    this.httpReq.searchPage(searchForm.value.searchInput, idPage).subscribe({
      next: (response) => {
        console.log(response);
        this.pages = response;
        console.log(this.pages);
      },
    });
  }

  updatePage() {
    this.pages[this.currentId] = this.newPage;
    this.httpReq.updatePage(this.pages[this.currentId]);
    return this.pages.slice();
  }

  modifyPage(currentPage: WebPage) {
    this.pagesChanged.next(currentPage);
  }
}
