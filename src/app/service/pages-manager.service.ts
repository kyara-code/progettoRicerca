import { assertPlatform, Injectable } from '@angular/core';
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
  isModify = false;
  newPage: WebPage;
  currentId: number;
  currentClient: string = 'search';
  isNewPage = false;

  constructor(private httpReq: HttpRequestsService) {}

<<<<<<< HEAD
  // da fare il metodo hasSearched per la guard di navigazione quando cerco
  // hasSearched() {
  //   const promise = new Promise((resolve, rejects) => {
  //     resolve(this.pages !== []);
  //   });
  //   console.log(this.pages !== []);
  //   return promise;
  // }

=======
>>>>>>> 2055ddb66353264808baeab612a05d8d8ed67908
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

  modifyPageUpdate(currentPage: WebPage) {
    this.pagesChanged.next(currentPage);
  }

  addNewPage(newPageForm: FormGroup) {
    const webPage = {
      titolo: newPageForm.value.titolo,
      descrizione: newPageForm.value.descrizione,
      chiavi: newPageForm.value.chiavi,
      url: newPageForm.value.url,
    };
    this.httpReq.compareNewPage(newPageForm.value.url).subscribe((response) => {
      console.log(response);
      if (response) {
        this.httpReq.postPage(webPage);
      } else {
        alert('This page already exist!');
      }
    });
  }
}
