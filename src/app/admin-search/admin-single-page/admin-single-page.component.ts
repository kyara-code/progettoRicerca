import { Router, ActivatedRoute } from '@angular/router';
import { PagesManagerService } from '../../service/pages-manager.service';
import { WebPage } from './../../model/page.model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-single-page',
  templateUrl: './admin-single-page.component.html',
  styleUrls: ['./admin-single-page.component.css'],
})
export class AdminSinglePageComponent implements OnInit {
  @Input() singlePage: WebPage;
  @Input() currentId: number;
  @Output() idPageDelete = new EventEmitter<number>();
  @Output() idPageModify = new EventEmitter<WebPage>();

  constructor(
    private pagesManagerService: PagesManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onDelete() {
    this.idPageDelete.emit(this.singlePage.id);
  }

  onModify() {
    // Cambio la variabile isModify in modo da avvertire il programma che sono nella modalità di modifica
    this.pagesManagerService.isModify = true;
    this.idPageModify.emit(this.singlePage);
  }
}
