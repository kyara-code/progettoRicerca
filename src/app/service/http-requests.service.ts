import { PagesManagerService } from 'src/app/service/pages-manager.service';
import { WebPage } from './../model/page.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService implements OnDestroy {
  pageNumber: number = 1;
  updateSections = new Subject<number>();
  searchInput = '';
  getReqCounter = 0;

  nothingToDisplay = false;

  subscribe1: Subscription;
  subscribe2: Subscription;
  subscribe3: Subscription;
  subscribe4: Subscription;

  pageLimitChanged = new Subject<number>();
  pageLimit = '3';

  constructor(private http: HttpClient, private authService: AuthService) {}

  onSearchWithParams(url: string) {
    return this.http.get<WebPage[]>('http://localhost:3000/ricerca?q=' + url);
  }

  determineSections() {
    this.http
      .get<WebPage[]>('http://localhost:3000/ricerca?q=' + this.searchInput)
      .subscribe((response) => {
        if (response.length > 30) {
          this.getReqCounter = 10;
          this.updateSections.next(this.getReqCounter);
          this.nothingToDisplay = false;
        } else {
          this.getReqCounter = Math.ceil(response.length / +this.pageLimit);
          this.updateSections.next(this.getReqCounter);
          this.nothingToDisplay = false;
          if (response.length === 0) {
            this.nothingToDisplay = true;
          }
        }
      });
  }

  searchPage() {
    let section = this.pageNumber.toString();
    return this.http.get<WebPage[]>(
      'http://localhost:3000/ricerca?q=' +
        this.searchInput +
        '&_page=' +
        section +
        '&_limit=' +
        this.pageLimit
    );
  }

  updatePage(webPage: WebPage) {
    this.http
      .put('http://localhost:3000/ricerca/' + webPage.id, webPage, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.accessToken,
        }),
      })
      .subscribe((response) => {});
  }

  postPage(webSite: WebPage) {
    this.http
      .post<WebPage>('http://localhost:3000/ricerca', webSite, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.accessToken,
        }),
      })
      .subscribe((response) => {});
  }

  deletePage(idPage: number) {
    this.http
      .delete('http://localhost:3000/ricerca/' + idPage, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.accessToken,
        }),
      })
      .subscribe(() => {});
  }

  compareNewPage(url: string) {
    return this.http.get<WebPage[]>('http://localhost:3000/ricerca?url=' + url);
  }

  ngOnDestroy(): void {
    this.subscribe1.unsubscribe();
    this.subscribe2.unsubscribe();
    this.subscribe3.unsubscribe();
    this.subscribe4.unsubscribe();
  }
}
