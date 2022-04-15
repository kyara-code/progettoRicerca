import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebPage } from '../model/page.model';
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

  items = [
    { id: 0, name: 'key' },
    { id: 1, name: 'title' },
    { id: 2, name: 'description' },
    { id: 3, name: 'language' },
    { id: 4, name: 'most recent first' },
  ];

  constructor(private http: HttpClient, private authService: AuthService) {}

  determineSections() {
    // per evitare di trovare un miliardo di siti si puo mettere il limite di 10 sezioni:
    // se è piu piccolo (il db) bene, senno si pone getReqCounter come il massimo (10)
    this.http
      .get<WebPage[]>('http://localhost:3000/ricerca?q=' + this.searchInput)
      .subscribe((response) => {
        this.getReqCounter = Math.ceil(response.length / 3);
        this.updateSections.next(this.getReqCounter);
        console.log(this.getReqCounter);
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
        '&_limit=3'
    );
  }

  updatePage(webPage: WebPage) {
    this.http
      .put('http://localhost:3000/ricerca/' + webPage.id, webPage, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.token,
        }),
      })
      .subscribe((response) => console.log(response));
  }

  postPage(webSite: WebPage) {
    this.http
      .post('http://localhost:3000/ricerca', webSite, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authService.token,
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
          Authorization: 'Bearer ' + this.authService.token,
        }),
      })
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }

  // getFilter(id: number) {
  //   switch (id) {
  //     case 0:
  //       this.filterSearchValue = 'chiavi';
  //       console.log(this.filterSearchValue);
  //       break;
  //     case 1:
  //       this.filterSearchValue = 'titolo';
  //       console.log(this.filterSearchValue);
  //       break;
  //     case 2:
  //       this.filterSearchValue = 'descrizione';
  //       console.log(this.filterSearchValue);
  //       break;
  //     case 3:
  //       this.filterSearchValue = 'lingua';
  //       console.log(this.filterSearchValue);
  //       break;
  //     case 4:
  //       this.filterSearchValue = 'data';
  //       console.log(this.filterSearchValue);
  //       break;
  //   }
}
