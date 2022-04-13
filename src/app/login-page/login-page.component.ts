import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    console.log(email);
    console.log(password);

    // aggiungo qua la chiamata al service per il login
    this.authService.logIn(email, password).subscribe((response) => {
      console.log(response);
    });

    authForm.reset();
  }
}
