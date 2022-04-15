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

  constructor(
    private httpReq: HttpRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    private pagesManagerService: PagesManagerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pagesManagerService.pagesModified.subscribe((pages) => {
      this.pages = pages;
    });
  }

  onSearch(searchForm: NgForm) {
    this.isNewPage = false;
    this.pagesManagerService.onSearch(searchForm, +this.idPage);
    this.pages = this.pagesManagerService.pages;
    console.log(this.pages);
    // this.router.navigate(['../'], { relativeTo: this.route });
  }

  onResetForm(searchForm: NgForm) {
    searchForm.reset();
  }

  onNewPage() {
    this.isNewPage = true;
    this.router.navigate(['edit'], { relativeTo: this.route });
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

  onModify(idPage: number) {
    this.isNewPage = true;
    this.pagesManagerService.currentId = idPage;
    // this.pages = this.pagesManagerService.updatePage();
    console.log(this.pages);
  }
}
