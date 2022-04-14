import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { WebPage } from './../model/page.model';
import { NgForm } from '@angular/forms';
import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css'],
})
export class AdminSearchComponent implements OnInit {
  isNewPage = false;
  pages: WebPage[] = [];

  constructor(
    private httpReq: HttpRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onSearch(searchForm: NgForm) {
    // da aggiungere il secondo parametro al metodo http!!!!
    // this.isNewPage = false;
    // this.router.navigate(['./'], { relativeTo: this.route });
    // this.httpReq.searchPage(searchForm.value.searchInput, ).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.pages = response;
    //   },
    // });
  }

  onNewPage() {
    this.isNewPage = true;
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onNavigateHome() {
    this.router.navigate(['/search']);
  }

  onDelete(idPage: number, i: number) {
    this.pages.splice(i, 1);
    this.httpReq.deletePage(idPage);
  }
}
