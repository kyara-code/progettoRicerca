import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {

  constructor(private http: HttpClient) {}

  searchPage(searchInput: string) {
    return this.http.get('http://localhost:3000/ricerca?q=' + searchInput);
  }
}
