import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebPage } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
<<<<<<< HEAD

  constructor(private http: HttpClient) {}

  searchPage(searchInput: string) {
    return this.http.get('http://localhost:3000/ricerca?q=' + searchInput);
=======
  constructor(private http: HttpClient) {}

  searchPage(searchInput: string) {
    console.log('Your search: ' + searchInput);
    return this.http.get<WebPage[]>(
      'http://localhost:3000/ricerca?chiavi_q=' + searchInput
    );
>>>>>>> ef986cd89ec88ff26d29c97aa4757c974d41cf71
  }
}
