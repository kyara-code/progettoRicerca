import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  items = [];

  constructor(private httpRequest: HttpRequestsService) {}

  ngOnInit(): void {
    this.items = this.httpRequest.items;
  }

  SelectItem(id) {
    // console.log(id);
    // this.httpRequest.getFilter(id);
    // finche non capiamo come fare ricerche miste non si può implementare il filtro
  }
}
