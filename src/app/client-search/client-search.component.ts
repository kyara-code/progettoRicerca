import { Router } from '@angular/router';
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
  pageNumber: string = '1';

  @ViewChild('f') clientSearchForm: NgForm;
  arrayPages: WebPage[] = [];
  search: string = null;
  authenticated: boolean = false;

  constructor(
    private httpReq: HttpRequestsService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticated = this.auth.loggedIn;
  }

  onSearch() {
    this.httpReq
      .searchPage(this.clientSearchForm.value.searchInput, this.pageNumber)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.arrayPages = response;
        },
      });
  }

  changePage() {
    this.pageNumber = (+this.pageNumber + 1).toString();
    this.onSearch();
  }

  onCancel() {
    this.search = null;
  }

  gotToAdminPage() {
    this.router.navigate(['/admin-search']);
  }
}
