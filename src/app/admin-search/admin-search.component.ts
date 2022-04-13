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

  constructor(private httpReq: HttpRequestsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onSearch(searchForm: NgForm) {
    this.isNewPage = false;
    this.httpReq.searchPage(searchForm.value.searchInput).subscribe({
      next: (response) => {
        console.log(response);
        this.pages = response;
      },
    });
  }

  onNewPage() {
    this.isNewPage = true;
    if(this.isNewPage) {
      this.router.navigate(['edit'], {relativeTo: this.route});
    }
  }

  onDeletePage() {}

  onNavigateHome() {
    this.router.navigate(['/search']);
  }
}
