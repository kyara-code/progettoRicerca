import { User } from './user.model';
import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  isAuthenticated = false;
  user: User;
  email: string;
  password: string;

  constructor(private httpReq: HttpRequestsService) { }

  ngOnInit(): void {
  }

  onSubmit(authForm: NgForm) {
    this.email = authForm.value.email;
    this.password = authForm.value.password;
    this.user = {
      username: this.email, 
      password: this.password}
    authForm.reset();
  }

}
