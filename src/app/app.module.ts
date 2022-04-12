import { AuthGuard } from './guard/auth-guard.service';
import { AuthService } from './service/auth.service';
import { HttpRequestsService } from './service/http-requests.service';
import { CanDeactivateGuard } from './guard/can-deactivate-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClientSinglePageComponent } from './client-search/client-single-page/client-single-page.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { AdminSinglePageComponent } from './admin-search/admin-single-page/admin-single-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ClientSearchComponent,
    ClientSinglePageComponent,
    AdminSearchComponent,
    AdminSinglePageComponent,
    ErrorPageComponent,
    LoginPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [CanDeactivateGuard, HttpRequestsService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
