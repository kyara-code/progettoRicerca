import { HttpClient } from '@angular/common/http';
import { AuthService } from './../service/auth.service';
import { WebPage } from './../model/page.model';
import { NgForm } from '@angular/forms';
import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css'],
})
export class ClientSearchComponent implements OnInit {
  @ViewChild('f') clientSearchForm: NgForm;
  arrayPages: WebPage[] = [];
  search: string = null;
  authenticated: boolean = false;

  constructor(
    private httpReq: HttpRequestsService,
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authenticated = this.auth.loggedIn;
  }

  onSearch() {
    this.httpReq.searchPage(this.clientSearchForm.value.searchInput).subscribe({
      next: (response) => {
        console.log(response);
        this.arrayPages = response;
      },
    });
  }

  onCancel() {
    this.search = null;
  }
}
