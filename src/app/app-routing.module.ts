import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { ClientSearchComponent } from './client-search/client-search.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoute: Routes = [
  { path: 'search', component: ClientSearchComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'admin-search', component: AdminSearchComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
})
export class AppRoutingModule {}