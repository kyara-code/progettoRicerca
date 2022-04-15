import { Injectable } from '@angular/core';
import { HttpRequestsService } from './http-requests.service';
import { NgForm, FormGroup } from '@angular/forms';
import { WebPage } from '../model/page.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagesManagerService {
  pages: WebPage[] = [];
  pagesChanged = new Subject<WebPage>();
  pagesModified = new Subject<WebPage[]>();
  newSection = new Subject<WebPage[]>();
  isPageModified = false;
  isModify = false;
  newPage: WebPage;
  currentId: number;

  constructor(private httpReq: HttpRequestsService) {}

  onSearch(searchForm: NgForm, idPage: number) {
    this.httpReq.searchInput = searchForm.value.searchInput;
    this.httpReq.pageNumber = idPage;
    this.httpReq.searchPage().subscribe({
      next: (response) => {
        console.log(response);
        this.pages = response;
        this.pagesModified.next(this.pages);
        console.log(this.pages);
      },
    });
  }

  comparePage(newPageForm: FormGroup) {
    let url = newPageForm.value.url;
    let pageAlreadyExist: boolean;
    this.httpReq.compareNewPage(url).subscribe((response) => {
      if (response.length) {
        pageAlreadyExist = true;
      } else {
        pageAlreadyExist = false;
      }
    });
    if (pageAlreadyExist) {
      return true;
    } else {
      return false;
    }
  }

  modifyPage(currentPage: WebPage) {
    this.pagesChanged.next(currentPage);
  }

  updatePage() {
    this.pages[this.currentId] = this.newPage;
    this.httpReq.updatePage(this.pages[this.currentId]);
    return this.pages.slice();
  }
}
