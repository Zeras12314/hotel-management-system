import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentRoute: string;
  showNavbar: boolean = true;
  showSidebar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        if (this.currentRoute.includes('login')) {
          this.showNavbar = !this.showNavbar;
          this.showSidebar = !this.showSidebar;
        } else if (this.currentRoute.includes('not-found')) {
          this.showNavbar = !this.showNavbar;
          this.showSidebar = !this.showSidebar;
        } else {
          this.showNavbar = true;
          this.showSidebar = true;
        }
        // Update showNavbar and showSidebar based on current route
        // this.showNavbar = !this.currentRoute.includes('login') || !this.currentRoute.includes('not-found');
        // this.showSidebar = !this.currentRoute.includes('login')|| !this.currentRoute.includes('not-found');
      });
  }
}
