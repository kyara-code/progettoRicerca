import { Router, ActivatedRoute } from '@angular/router';
import { PagesManagerService } from './../pages-manager.service';
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
  @Output() idPageModify = new EventEmitter<number>();

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
    this.pagesManagerService.isModify = true;
    this.idPageModify.emit(this.currentId);
    this.pagesManagerService.modifyPage(this.singlePage);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
