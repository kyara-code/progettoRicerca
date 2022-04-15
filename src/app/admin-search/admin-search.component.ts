import { AuthService } from './../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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

  searched = false;

  constructor(
    private httpReq: HttpRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    public pagesManagerService: PagesManagerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.pagesManagerService.pagesModified.subscribe((pages) => {
    //   this.pages = pages;
    // });
    this.pagesManagerService.newSection.subscribe((pagesOfThisSection) => {
      this.pages = pagesOfThisSection;
    });
    this.pagesManagerService.currentClient = 'admin-search';
  }

  onSearch(searchForm: NgForm) {
    this.searched = true;
    this.isNewPage = false;
    // this.pagesManagerService.onSearch(searchForm, +this.idPage);
    this.httpReq.searchInput = searchForm.value.searchInput;
    this.httpReq.getReqCounter = 0;
    this.httpReq.determineSections();

    this.httpReq.searchPage().subscribe((response) => {
      this.pages = response;
    });

    this.router.navigate(['admin-search', 0]);
  }

  onResetForm(searchForm: NgForm) {
    searchForm.reset();
  }

  onNewPage() {
    this.isNewPage = true;
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
    this.isNewPage = true;
    this.pagesManagerService.modifyPage(page);
    // this.router.navigate(['edit'], { relativeTo: this.route });
    this.pagesManagerService.currentId = idPage;
    // this.pages = this.pagesManagerService.updatePage();
  }

  doneAddingPage(addPageDone: boolean) {
    this.isNewPage = false;
  }
}
