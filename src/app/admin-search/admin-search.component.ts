import { NgForm } from '@angular/forms';
import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-search',
  templateUrl: './admin-search.component.html',
  styleUrls: ['./admin-search.component.css']
})
export class AdminSearchComponent implements OnInit {

  isNewPage = false;

  constructor(private httpReq: HttpRequestsService) { }

  ngOnInit(): void {
  }

  onSearch(searchForm: NgForm) {
    this.httpReq.searchPage(searchForm.value.searchInput).subscribe(responseData => {
      console.log(responseData)
    })
  }

  onAddPage() {

  }

}
