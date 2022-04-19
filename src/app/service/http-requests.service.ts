import { WebPage } from './../model/page.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  pageNumber: number = 1;
  pageChanged = new Subject<number>();
  updateSections = new Subject<number>();
  searchInput = '';
  filterSearchValue = '';
  getReqCounter = 0;

  pageLimitChanged = new Subject<number>();
  pageLimit = '3';

  items = [
    { id: 0, name: 'key' },
    { id: 1, name: 'title' },
    { id: 2, name: 'description' },
    { id: 3, name: 'language' },
    { id: 4, name: 'most recent first' },
  ];

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
        } else {
          this.getReqCounter = Math.ceil(response.length / +this.pageLimit);
          this.updateSections.next(this.getReqCounter);
        }
      });
  }

  searchPage() {
    let section = this.pageNumber.toString();
    console.log('Your search: ' + this.searchInput);
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
      .subscribe((response) => console.log(response));
  }

  postPage(webSite: WebPage) {
    this.http
      .post('http://localhost:3000/ricerca', webSite, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.accessToken,
        }),
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePage(idPage: number) {
    console.log('Service attivo');
    this.http
      .delete('http://localhost:3000/ricerca/' + idPage, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.accessToken,
        }),
      })
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }

  compareNewPage(url: string) {
    return this.http.get<WebPage[]>('http://localhost:3000/ricerca?url=' + url);
  }
}
