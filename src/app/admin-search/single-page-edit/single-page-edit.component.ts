import { PagesManagerService } from '../../service/pages-manager.service';
import { Router } from '@angular/router';
import { WebPage } from './../../model/page.model';
import { HttpRequestsService } from './../../service/http-requests.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-page-edit',
  templateUrl: './single-page-edit.component.html',
  styleUrls: ['./single-page-edit.component.css'],
})
export class SinglePageEditComponent implements OnInit, OnDestroy {
  newPage: WebPage;

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
    if (this.pagesManagerService.isModify) {
      this.subscribtion = this.pagesManagerService.pagesChanged.subscribe(
        (newPage) => {
          this.newPage = newPage;
          this.newPageForm.patchValue(newPage);
          console.log(newPage);
        }
      );
    }
  }

  onSubmit() {
    if (this.pagesManagerService.isModify) {
      const webPage = {
        titolo: this.newPageForm.value.titolo,
        descrizione: this.newPageForm.value.descrizione,
        chiavi: this.newPageForm.value.chiavi,
        url: this.newPageForm.value.url,
        id: this.newPage.id,
      };
      this.pagesManagerService.newPage = webPage;
      this.pagesManagerService.pagesModified.next(
        this.pagesManagerService.updatePage()
      );
    } else {
      const webPage = {
        titolo: this.newPageForm.value.titolo,
        descrizione: this.newPageForm.value.descrizione,
        chiavi: this.newPageForm.value.chiavi,
        url: this.newPageForm.value.url,
      };
      this.http.postPage(webPage);
    }
    this.pagesManagerService.isModify = false;
    this.pagesManagerService.isPageModified = true;
    this.router.navigate(['/admin-search']);
  }

  ngOnDestroy() {
    if (this.pagesManagerService.isModify) {
      this.subscribtion.unsubscribe();
    }
  }
}
