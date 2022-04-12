import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
