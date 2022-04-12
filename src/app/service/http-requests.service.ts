import { HttpClient } from '@angular/common/http';
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
      'http://localhost:3000/ricerca?chiavi_q=' + searchInput
    );
  }
}
