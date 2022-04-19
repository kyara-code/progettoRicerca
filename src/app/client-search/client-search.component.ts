import { PagesManagerService } from './../service/pages-manager.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  pageNumber: number = 1;
  searched = false;

  @ViewChild('f') clientSearchForm: NgForm;
  arrayPages: WebPage[] = [];
  search: string = null;
  authenticated: boolean = false;

  constructor(
    private httpReq: HttpRequestsService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesManagerService
  ) {}

  ngOnInit(): void {
    this.authenticated = this.auth.loggedIn;
    this.pagesService.currentClient = 'search';
  }

  onSearch() {
    this.searched = true;
    this.httpReq.searchInput = this.clientSearchForm.value.searchInput;
    this.httpReq.getReqCounter = 0;
    this.httpReq.determineSections();
    this.router.navigate([
      '/search',
      this.httpReq.searchInput,
      '&_page=' +
        +this.httpReq.pageNumber +
        '&_limit=' +
        this.httpReq.pageLimit,
    ]);
  }

  onCancel() {
    this.search = null;
  }

  gotToAdminPage() {
    this.router.navigate(['/admin-search']);
  }

  logout() {
    this.authenticated = false;
    this.auth.logout();
  }
}
