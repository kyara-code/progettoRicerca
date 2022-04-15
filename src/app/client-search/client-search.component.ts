import { PagesManagerService } from './../service/pages-manager.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../service/auth.service';
import { WebPage } from './../model/page.model';
import { NgForm } from '@angular/forms';
import { HttpRequestsService } from './../service/http-requests.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css'],
})
export class ClientSearchComponent implements OnInit {
  pageNumber: number = 1;

  @ViewChild('f') clientSearchForm: NgForm;
  arrayPages: WebPage[] = [];
  search: string = null;
  authenticated: boolean = false;

  constructor(
    private httpReq: HttpRequestsService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private pagesService: PagesManagerService
  ) {}

  ngOnInit(): void {
    this.authenticated = this.auth.loggedIn;
    this.pagesService.newSection.subscribe((pagesOfThisSection) => {
      this.arrayPages = pagesOfThisSection;
    });
  }

  onSearch() {
    this.httpReq.searchInput = this.clientSearchForm.value.searchInput;
    this.httpReq.getReqCounter = 0;
    this.httpReq.determineSections();
    this.httpReq.searchPage().subscribe({
      next: (response) => {
        // Questo array a che serve?
        // chiara: a stampare le pagine che con le varie richieste get mi arrivano
        this.arrayPages = response;
        // Qui salvi in pageNumber il numero delle pagine per sezione, poi però passi lo stesso numero (di pagine) ad updateSections.
        // Ma ad updateSections è iscritto il componente pagination che riceve il numero delle pagine al posto che il numero delle sezioni.
        // Infatti se vai a cambiare il limite di pagine per sezione, cambierà anche il numero delle sezioni. Continuare in pagination.component.ts

        // this.httpReq.pageNumber = Math.ceil(response.length);

        // da capire che numero mettere come numero di sezioni: 10 pagine --> 4 sezioni
        // this.httpReq.updateSections.next(this.httpReq.pageNumber);
        // this.router.navigate(['/search/0']);
      },
    });
    this.router.navigate(['/search', 0]);
  }

  changePage() {
    this.pageNumber = this.pageNumber + 1;
    this.onSearch();
  }

  onCancel() {
    this.search = null;
  }

  gotToAdminPage() {
    this.router.navigate(['/admin-search']);
  }

  // logout da aggiustare da fare un subject per iscrivere i cambiamenti
  logout() {
    this.authenticated = false;
    this.auth.logout();
  }
}
