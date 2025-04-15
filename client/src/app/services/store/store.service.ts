import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { RouteConstants } from 'src/app/utils/route.constants';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  value: string;
  currentPage: string;
  private refreshRoomLists$ = new Subject<void>(); // rxjs signal to refresh room
  // searh data
  searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();
  // get room data
  private roomsSubject = new BehaviorSubject<any[]>([]);
  room$ = this.roomsSubject.asObservable();
  // toggle sort order
  sortAscendingSubject = new BehaviorSubject<boolean | null>(null);
  sortAscending$ = this.sortAscendingSubject.asObservable();

  constructor(private router: Router) {}

  setRooms(rooms: any[]) {
    this.roomsSubject.next(rooms);
  }

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

  getCurrentPage() {
    return this.currentPage;
  }

  triggerRoomRefresh() {
    this.refreshRoomLists$.next(); //trigger
  }

  onRoomRefresh() {
    return this.refreshRoomLists$.asObservable(); // listen
  }

  setSearchQuery(query: string) {
    this.searchQuerySubject.next(query.trim().toLowerCase());
  }

  // set default value for sort order (no sort is selected)
  setSortOrder(isAscending: boolean | null) {
    this.sortAscendingSubject.next(isAscending);
  }

  toggleSortOrder(isAscending: boolean | null) {
    this.sortAscendingSubject.next(isAscending);
  }
}
