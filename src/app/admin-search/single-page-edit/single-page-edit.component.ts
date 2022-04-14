import { PagesManagerService } from './../pages-manager.service';
import { Router } from '@angular/router';
import { WebPage } from './../../model/page.model';
import { HttpRequestsService } from './../../service/http-requests.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-page-edit',
  templateUrl: './single-page-edit.component.html',
  styleUrls: ['./single-page-edit.component.css'],
})
export class SinglePageEditComponent implements OnInit, OnDestroy {
  newPageForm = new FormGroup({
    titolo: new FormControl(null, Validators.required),
    url: new FormControl(null, Validators.required),
    chiavi: new FormControl(null, Validators.required),
    descrizione: new FormControl(null, Validators.required),
  });

  constructor(
    private http: HttpRequestsService,
    private router: Router,
    private pagesManagerService: PagesManagerService
  ) {}

  subscribtion: Subscription;

  ngOnInit(): void {
    this.subscribtion = this.pagesManagerService.pagesChanged.subscribe(
      (newPage) => {
        this.newPageForm.patchValue(newPage);
      }
    );
  }

  onSubmit() {
    const webPage = {
      titolo: this.newPageForm.value.titolo,
      descrizione: this.newPageForm.value.descrizione,
      chiavi: this.newPageForm.value.chiavi,
      url: this.newPageForm.value.url,
    };
    this.pagesManagerService.newPage = webPage;
    if (this.pagesManagerService.isModify) {
      this.pagesManagerService.updatePage();
    } else {
      this.http.postPage(webPage);
    }
    this.router.navigate(['/admin-search']);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
