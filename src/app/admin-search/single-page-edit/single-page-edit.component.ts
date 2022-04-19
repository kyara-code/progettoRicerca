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

  @Output() addPageDone = new EventEmitter<boolean>();

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
        this.newPage = newPage;
        this.newPageForm.patchValue(newPage);
      }
    );
  }

  // Pulito il metodo e aggiunto il fatto che non si possano inserire pagine con lo stesso url
  onSubmit() {
    //Parte di modifica
    if (this.pagesManagerService.isModify) {
      this.pagesManagerService.modifyPage(this.newPageForm, this.newPage.id);
    } else {
      // Parte di aggiunta nuova pagina
      this.pagesManagerService.addNewPage(this.newPageForm);
    }
    this.pagesManagerService.isModify = false;
    this.addPageDone.emit();
    this.router.navigate(['/admin-search']);
  }

  ngOnDestroy() {
    if (this.pagesManagerService.isModify) {
      this.subscribtion.unsubscribe();
    }
  }
}
