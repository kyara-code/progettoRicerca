import { HttpRequestsService } from './../service/http-requests.service';
import { WebPage } from './../model/page.model';
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
    private httpReq: HttpRequestsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.httpReq.searchInput = params['searchInput'];
      this.httpReq.getReqCounter = 0;
      this.httpReq.determineSections();

      let url = params['searchInput'] + params['id'];
      console.log(url);
      this.httpReq.onSearchWithParams(url).subscribe((response) => {
        this.arrayPages = response;
      });
    });
  }
}
