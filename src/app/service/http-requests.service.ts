import { User } from './../login-page/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebPage } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(private http: HttpClient) {}

  searchPage(searchInput: string) {
    console.log('Your search: ' + searchInput);
    return this.http.get<WebPage[]>(
      'http://localhost:3000/ricerca?chiavi_like=' + searchInput
    );
    // fare tre get: uno per la ricerca tra le chiavi (do 3 punti),
    // uno per la ricerca tra i titoli, do due punti,
    // uno per la ricerca tra le descrizioni e do un punto,
    // e poi dispongo le pagine seguendo l'ordine della classifica
  }

  postPage(webSite: WebPage) {
    this.http.post('http://localhost:3000/ricerca', webSite,{
  }).subscribe(response => {
    })
  }
}
