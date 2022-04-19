import { localService } from './../local.service';
import { PagesManagerService } from '../../service/pages-manager.service';
import { Router } from '@angular/router';
import { HttpRequestsService } from './../../service/http-requests.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-page-edit',
  templateUrl: './single-page-edit.component.html',
  styleUrls: ['./single-page-edit.component.css'],
})
export class SinglePageEditComponent implements OnInit {
  newPageForm = new FormGroup({
    titolo: new FormControl(null, Validators.required),
    url: new FormControl(null, Validators.required),
    chiavi: new FormControl(null, Validators.required),
    descrizione: new FormControl(null, Validators.required),
  });

  constructor(
    private httpReq: HttpRequestsService,
    private router: Router,
    private pagesManagerService: PagesManagerService,
    private local: localService
  ) {}

  subscribtion: Subscription;

  ngOnInit(): void {
    this.newPageForm.patchValue(this.local.currentPage);

    this.local.currentPath =
      '/admin-search/' +
      this.httpReq.searchInput +
      '/&_page=' +
      this.httpReq.pageNumber +
      '&_limit=' +
      this.httpReq.pageLimit;
  }

  onSubmit() {
    if (this.pagesManagerService.isModify) {
      this.pagesManagerService.modifyPage(
        this.newPageForm,
        this.local.currentPage.id
      );
    } else {
      this.pagesManagerService.addNewPage(this.newPageForm);
    }
    this.pagesManagerService.isModify = false;
    this.local.addPageDone.next();
    console.log(this.local.currentPath);
    this.local.isNewPage = false;
    console.log(this.local.currentPath);
    this.router.navigate([this.local.currentPath]);
  }
}
