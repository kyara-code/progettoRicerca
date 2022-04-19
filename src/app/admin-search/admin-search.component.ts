import { AuthService } from './../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WebPage } from './../model/page.model';
import { NgForm } from '@angular/forms';
import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit } from '@angular/core';
import { PagesManagerService } from '../service/pages-manager.service';
@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css'],
})
export class AdminSearchComponent implements OnInit {
  isNewPage = false;
  pages: WebPage[] = [];
  idPage = '1';

  currentPage: WebPage;
  currentPath: string;

  searched = false;

  constructor(
    private httpReq: HttpRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    public pagesManagerService: PagesManagerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id']); //unde

      this.httpReq.searchInput = params['searchInput'];
      console.log(params['searchInput']); //und
      this.httpReq.getReqCounter = 0;
      this.httpReq.determineSections();

      let url = params['searchInput'] + params['id'];
      console.log(url); //NaN
      this.httpReq.onSearchWithParams(url).subscribe((response) => {
        this.pages = response;
      });
    });

    this.authService.autoExit.subscribe(() => {
      this.router.navigate(['/search']);
    });
    this.pagesManagerService.newSection.subscribe((pagesOfThisSection) => {
      this.pages = pagesOfThisSection;
    });
    this.pagesManagerService.currentClient = 'admin-search';

    this.pagesManagerService.pagesModified.subscribe((pages) => {
      this.pages = pages;
    });
  }

  onSearch(searchForm: NgForm) {
    this.searched = true;
    this.isNewPage = false;
    this.httpReq.searchInput = searchForm.value.searchInput;
    this.httpReq.getReqCounter = 0;
    this.httpReq.determineSections();
    this.httpReq.searchPage().subscribe((response) => {
      this.pages = response;
    });
    this.currentPath =
      this.httpReq.searchInput +
      '/&_page=' +
      +this.httpReq.pageNumber +
      '&_limit=' +
      this.httpReq.pageLimit;
    console.log(this.currentPath);

    this.router.navigate([
      '/admin-search',
      this.httpReq.searchInput,
      '&_page=' +
        +this.httpReq.pageNumber +
        '&_limit=' +
        this.httpReq.pageLimit,
    ]);
  }

  onResetForm(searchForm: NgForm) {
    searchForm.reset();
  }

  onNewPage() {
    this.isNewPage = true;
    this.currentPage = null;
    this.searched = false;
    this.route.params.subscribe((params: Params) => {
      this.currentPath = params['searchInput'] + '/' + params['id'];
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

  onDelete(idPage: number, i: number) {
    this.pages.splice(i, 1);
    this.httpReq.deletePage(idPage);
  }

  onModify(idPage: number, page: WebPage) {
    this.searched = false;
    this.isNewPage = true;
    // this.pagesManagerService.modifyPageUpdate(page);
    this.currentPage = page;
    console.log(this.currentPage);
    this.pagesManagerService.currentId = idPage;
  }

  doneAddingPage() {
    this.searched = true;
    this.isNewPage = false;
    this.httpReq.onSearchWithParams(this.currentPath).subscribe((response) => {
      this.pages = response;
    });
  }
}
