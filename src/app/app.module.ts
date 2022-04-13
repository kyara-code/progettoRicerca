import { AuthGuard } from './guard/auth-guard.service';
import { HttpRequestsService } from './service/http-requests.service';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinglePageEditComponent } from './admin-search/single-page-edit/single-page-edit.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientSearchComponent,
    ClientSinglePageComponent,
    AdminSearchComponent,
    AdminSinglePageComponent,
    ErrorPageComponent,
    LoginPageComponent,
    SinglePageEditComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpRequestsService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
