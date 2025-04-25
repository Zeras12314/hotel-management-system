import { Component, OnInit } from '@angular/core';

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

  constructor(
    private modalService: ModalService,
    private storeService: StoreService,
    private translationService: TranslationService
  ) {}
  ngOnInit(): void {
    // Force 'en' as the active language

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

  // onSortClickAscending(){
  //   this.storeService.toggleSortOrder();
  //   this.isActive = !this.isActive;
  // }

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
}
