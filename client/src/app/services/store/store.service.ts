import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/utils/route.constants';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  value: string;
  currentPage: string;
  constructor(private router: Router) {}

  setValue(value: string): void {
    this.value = value;
    console.log('FROM store service', this.value);
  }

  setCurrentPage() {
    this.currentPage = this.router.url;

    switch (true) {
      case this.currentPage.includes(RouteConstants.ROOMS):
        this.currentPage = 'ROOMS';
        break;
      case this.currentPage.includes(RouteConstants.HOME):
        this.currentPage = 'HOME';
        break;
      default:
        this.currentPage = 'UNKNOWN_PAGE';
        break;
    }
  }

  getCurrentPage(){
    return this.currentPage
  }
}
