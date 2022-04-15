import { LoginService } from './service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'progettoRicerca';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.autoLogin();
  }
}
