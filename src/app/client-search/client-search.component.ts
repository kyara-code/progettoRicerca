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
  @ViewChild('f') clientSearchForm: NgForm;
  arrayPages: WebPage[] = [];
  search: string = null;

  constructor(private httpReq: HttpRequestsService) {}

  ngOnInit(): void {}

  onSearch() {
<<<<<<< HEAD
    this.httpReq.searchPage(this.searchInput).subscribe({
=======
    this.httpReq.searchPage(this.clientSearchForm.value.searchInput).subscribe({
>>>>>>> ef986cd89ec88ff26d29c97aa4757c974d41cf71
      next: (response) => {
        console.log(response);
        this.arrayPages = response;
      },
    });
  }

  onCancel() {
    this.search = null;
  }
}
