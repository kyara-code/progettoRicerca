import { AuthService } from './../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebPage } from './../model/page.model';
import { NgForm } from '@angular/forms';
import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit } from '@angular/core';
import { PagesManagerService } from '../service/pages-manager.service';
import { localService } from './local.service';
@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css'],
  providers: [localService],
})
export class AdminSearchComponent implements OnInit {
  // isNewPage = false;
  pages: WebPage[] = [];
  idPage = '1';

  currentPage: WebPage;
  currentPath: string;

  // searched = false;

  constructor(
    private httpReq: HttpRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    public pagesManagerService: PagesManagerService,
    private authService: AuthService,
    public local: localService
  ) {}

  ngOnInit(): void {
    this.local.addPageDone.subscribe(() => {
      this.doneAddingPage();
    });

    this.authService.autoExit.subscribe(() => {
      this.router.navigate(['/search']);
    });

    this.pagesManagerService.currentClient = 'admin-search';

    this.pagesManagerService.pagesModified.subscribe((pages) => {
      this.pages = pages;
    });
  }

  onSearch(searchForm: NgForm) {
    this.local.searched = true;
    this.local.isNewPage = false;
    this.httpReq.searchInput = searchForm.value.searchInput;
    this.httpReq.getReqCounter = 0;
    this.httpReq.determineSections();
    this.httpReq.searchPage().subscribe((response) => {
      this.pages = response;
    });

    this.local.currentPath =
      '/admin-search/' +
      this.httpReq.searchInput +
      '/&_page=' +
      '1' +
      '&_limit=' +
      this.httpReq.pageLimit;

    this.router.navigate([
      '/admin-search',
      this.httpReq.searchInput,
      '&_page=' + '1' + '&_limit=' + this.httpReq.pageLimit,
    ]);
  }

  onResetForm(searchForm: NgForm) {
    searchForm.reset();
  }

  onNewPage() {
    this.local.isNewPage = true;
    this.local.currentPage = null;
    this.local.searched = false;
    this.route.params.subscribe((params: Params) => {
      if (params['searchInput'] && params['id']) {
        this.local.currentPath =
          '/admin-search/' + params['searchInput'] + '/' + params['id'];
      } else {
        this.local.currentPath = '/admin-search';
      }
    });
    this.router.navigate(['/admin-search/edit']);
  }

  onNavigateHome() {
    this.router.navigate(['/search']);
  }

  onLogout() {
    this.authService.logout();
    this.onNavigateHome();
  }

  doneAddingPage() {
    this.local.searched = true;
    this.local.isNewPage = false;
    this.httpReq.onSearchWithParams(this.currentPath).subscribe((response) => {
      this.pages = response;
    });
  }
}
