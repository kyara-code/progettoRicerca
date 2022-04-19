import { PagesManagerService } from '../../service/pages-manager.service';
import { Router } from '@angular/router';
import { WebPage } from './../../model/page.model';
import { HttpRequestsService } from './../../service/http-requests.service';
import {
  Component,
  EventEmitter,
  Input,
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
export class SinglePageEditComponent implements OnInit {
  // newPage: WebPage;

  @Input() newPage: WebPage;
  @Input() path: string;
  @Output() addPageDone = new EventEmitter<boolean>();

  newPageForm = new FormGroup({
    titolo: new FormControl(null, Validators.required),
    url: new FormControl(null, Validators.required),
    chiavi: new FormControl(null, Validators.required),
    descrizione: new FormControl(null, Validators.required),
  });

  constructor(
    private httpReq: HttpRequestsService,
    private router: Router,
    private pagesManagerService: PagesManagerService
  ) {}

  subscribtion: Subscription;

  ngOnInit(): void {
    this.newPageForm.patchValue(this.newPage);
  }

  onSubmit() {
    if (this.pagesManagerService.isModify) {
      this.pagesManagerService.modifyPage(this.newPageForm, this.newPage.id);
    } else {
      this.pagesManagerService.addNewPage(this.newPageForm);
    }
    this.pagesManagerService.isModify = false;
    this.addPageDone.emit();
    this.router.navigate(['/admin-search/' + this.path]);
  }
}
