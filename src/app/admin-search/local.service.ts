import { PagesManagerService } from './../service/pages-manager.service';
import { HttpRequestsService } from 'src/app/service/http-requests.service';
import { WebPage } from '../model/page.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class localService {
  pages: WebPage[];
  searched: boolean = false;
  isNewPage: boolean = false;
  currentPage: WebPage;
  currentPath: string;

  addPageDone = new Subject<void>();

  constructor(
    private httpReq: HttpRequestsService,
    private pagesManagerService: PagesManagerService
  ) {}

  onDelete(idPage: number, i: number) {
    this.pages.splice(i, 1);
    this.httpReq.deletePage(idPage);
  }

  onModify(idPage: number, page: WebPage) {
    this.searched = false;
    this.isNewPage = true;
    this.currentPage = page;
    this.pagesManagerService.currentId = idPage;
  }
}
