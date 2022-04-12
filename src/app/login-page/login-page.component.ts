import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isAuthenticated = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    console.log(email)
    console.log(password)
  }

}
