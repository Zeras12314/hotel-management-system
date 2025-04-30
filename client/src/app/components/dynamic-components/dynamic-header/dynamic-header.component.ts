import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from 'src/app/services/modal.service';
import { StoreService } from 'src/app/services/store/store.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-dynamic-header',
  templateUrl: './dynamic-header.component.html',
  styleUrls: ['./dynamic-header.component.scss'],
})
export class DynamicHeaderComponent implements OnInit {
  isAscending: boolean | null = null; // Default is 'null', meaning no selection
  activePage: string = '';

  constructor(
    private modalService: ModalService,
    private storeService: StoreService,
    private translationService: TranslationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getTitleTranslation();
    // Listen to changes in sort order from the store
    this.storeService.sortAscending$.subscribe((ascending) => {
      this.isAscending = ascending; // Update isAscending based on the store's value
    });
  }

  // Method to trigger modal open
  openModal() {
    // Just call openDialog - service handles registration
    this.modalService.openDialog('exampleModal', { data: 'example' });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;
    this.storeService.setSearchQuery(searchTerm);
  }

  onSortClickAscending() {
    this.isAscending = true;
    this.storeService.setSortOrder(true);
  }

  onSortClickDescending() {
    this.isAscending = false;
    this.storeService.setSortOrder(false);
  }

  onResetFilter() {
    this.isAscending = null;
    this.storeService.setSortOrder(null);
  }

  getTitleTranslation() {
    switch (this.router.url) {
      case '/rooms':
        this.activePage = 'Room';
        break;
      case '/guests':
        this.activePage = 'Guest';
        break;
    }
  }
}
