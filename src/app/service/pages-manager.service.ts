import { Injectable } from '@angular/core';
import { HttpRequestsService } from './http-requests.service';
import { FormGroup } from '@angular/forms';
import { WebPage } from '../model/page.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagesManagerService {
  pages: WebPage[] = [];
  pagesModified = new Subject<WebPage[]>();
  newSection = new Subject<WebPage[]>();
  isModify = false;
  newPage: WebPage;
  currentId: number;
  currentClient: string = 'search';
  isNewPage = false;

  constructor(private httpReq: HttpRequestsService) {}

  updatePage() {
    this.pages[this.currentId] = this.newPage;
    this.httpReq.updatePage(this.pages[this.currentId]);
    return this.pages.slice();
  }

  modifyPage(newPageForm: FormGroup, id: number) {
    const webPage = {
      titolo: newPageForm.value.titolo,
      descrizione: newPageForm.value.descrizione,
      chiavi: newPageForm.value.chiavi,
      url: newPageForm.value.url,
      id: id,
    };
    this.newPage = webPage;
    this.pagesModified.next(this.updatePage());
    this.isModify = false;
  }

  addNewPage(newPageForm: FormGroup) {
    const webPage = {
      titolo: newPageForm.value.titolo,
      descrizione: newPageForm.value.descrizione,
      chiavi: newPageForm.value.chiavi,
      url: newPageForm.value.url,
    };
    this.httpReq.compareNewPage(newPageForm.value.url).subscribe((response) => {
      if (response.length) {
        alert('This page already exist!');
      } else {
        this.httpReq.postPage(webPage).subscribe((response) => {});
      }
    });
    this.pages.push(webPage);
    this.pagesModified.next(this.pages.slice());
  }
}
