import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css'],
})
export class ClientSearchComponent implements OnInit {
  searchInput: string = null;

  constructor(private httpReq: HttpRequestsService) {}

  ngOnInit(): void {}

  onSearch() {
    this.httpReq.searchPage().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
