import { AuthGuard } from './../guard/auth-guard.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  isAuthenticated = false;
  user: User;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {}

  ngOnInit(): void {}

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    console.log(email);
    console.log(password);

    this.authService.logIn(email, password);

    authForm.reset();
  }
}
