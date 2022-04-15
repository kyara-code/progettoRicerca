import { HttpRequestsService } from './../service/http-requests.service';
import { WebPage } from './../model/page.model';
import { PagesManagerService } from './../service/pages-manager.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-pages',
  templateUrl: './display-pages.component.html',
  styleUrls: ['./display-pages.component.css'],
})
export class DisplayPagesComponent implements OnInit {
  arrayPages: WebPage[] = [];
  searchInput = '';

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesManagerService,
    private httpReq: HttpRequestsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params['id']);

      this.httpReq.searchInput = params['searchInput'];
      console.log(params['searchInput']);
      this.httpReq.getReqCounter = 0;
      this.httpReq.determineSections();

      let url = params['searchInput'] + params['id'];
      this.httpReq.onSearchWithParams(url).subscribe((response) => {
        this.arrayPages = response;
      });
    });
  }
}
