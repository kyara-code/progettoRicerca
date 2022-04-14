import { WebPage } from './../../model/page.model';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-single-page',
  templateUrl: './admin-single-page.component.html',
  styleUrls: ['./admin-single-page.component.css'],
})
export class AdminSinglePageComponent implements OnInit {
  @Input() singlePage: WebPage;
  @Input() idPageInput: number;
  @Output() idPageDelete = new EventEmitter<number>();
  @Output() idPageModify = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  onDelete() {
    this.idPageDelete.emit(this.idPageInput);
  }

  onModify() {
    this.idPageModify.emit(this.idPageInput);
  }
}
