import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebPage } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  filterSearchValue = '';
  items = [
    { id: 0, name: 'key' },
    { id: 1, name: 'title' },
    { id: 2, name: 'description' },
    { id: 3, name: 'language' },
    { id: 4, name: 'most recent first' },
  ];

  constructor(private http: HttpClient, private authService: AuthService) {}

  searchPage(searchInput: string) {
    console.log('Your search: ' + searchInput);
    console.log(
      'http://localhost:3000/ricerca?' +
        this.filterSearchValue +
        '_like=' +
        searchInput
    );
    return this.http.get<WebPage[]>(
      'http://localhost:3000/ricerca?q=' + searchInput
      //ricerca da cambiare in qualcosa_like= se ti serve qualcosa di specifico
    );
    // fare tre get: uno per la ricerca tra le chiavi (do 3 punti),
    // uno per la ricerca tra i titoli, do due punti,
    // uno per la ricerca tra le descrizioni e do un punto,
    // e poi dispongo le pagine seguendo l'ordine della classifica
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

  deletePage() {
    this.http.delete('http://localhost:3000/ricerca');
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
