import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-page-edit',
  templateUrl: './single-page-edit.component.html',
  styleUrls: ['./single-page-edit.component.css']
})
export class SinglePageEditComponent implements OnInit {

  newPageForm = new FormGroup({
    'title': new FormControl(null, Validators.required),
    'url': new FormControl(null, Validators.required),
    'key': new FormControl(null, Validators.required),
    'description': new FormControl(null, Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
