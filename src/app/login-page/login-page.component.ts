// import { AuthGuard } from './../guard/auth-guard.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { Router } from '@angular/router';

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
    // private authGuard: AuthGuard
  ) {}

  ngOnInit(): void {}

  onSubmit(authForm: NgForm) {
    const user = authForm.value.user;
    const password = authForm.value.password;
    console.log(user)
    console.log(password)

<<<<<<< HEAD
    this.authService.logIn(user, password);
      this.router.navigate(['/admin-search']);
      
=======
    this.authService.logIn(email, password);

>>>>>>> 7a6323070496021d3e54ea55e94bca8b47117a17
    authForm.reset();
  }
}
