import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showSidebar = true;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
