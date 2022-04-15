import { DisplayPagesComponent } from './display-pages/display-pages.component';
import { SinglePageEditComponent } from './admin-search/single-page-edit/single-page-edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { ClientSearchComponent } from './client-search/client-search.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.service';

const appRoute: Routes = [
  { path: '', component: ClientSearchComponent, pathMatch: 'full' },
  {
    path: 'search',
    component: ClientSearchComponent,
    children: [
      {
        path: ':searchInput/:id',
        component: DisplayPagesComponent,
      },
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'error', component: ErrorPageComponent },
  {
    path: 'admin-search',
    component: AdminSearchComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'edit', component: SinglePageEditComponent },
      { path: ':id', component: DisplayPagesComponent },
    ],
  },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
