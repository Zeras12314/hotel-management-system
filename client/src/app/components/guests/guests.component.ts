import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, of, take } from 'rxjs';
import { Guest } from 'src/app/models/header.model';
import { GuestService } from 'src/app/services/guest/guest.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
})
export class GuestsComponent implements OnInit {
  guests$: Observable<any>;
  isLoading: boolean = false;
  noDataToDisplay: boolean = false;
  currentPage: number = 1;
  totalPages: number;
  pageSize: number = 10; // Number of rows per page
  allData: any[] = [];

  constructor(
    private guestService: GuestService,
    private storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    this.getAllGuests();
    this.loadInitialData();
    this.handleSearchQuery(); // handle search filtering reactively
  }

  getAllGuests() {
    this.isLoading = true;

    this.guests$ = combineLatest([
      this.guestService.getAllGuest().pipe(take(1)),
      this.storeService.searchQuery$
    ]).pipe(
      map(([guests, query]) => {
        const transformedData = this.transformData(guests); // transform first
        const filteredData = this.filterData(transformedData, query); // filter full dataset

        this.totalPages = Math.ceil(filteredData.length / this.pageSize);
        this.currentPage = Math.min(this.currentPage, this.totalPages || 1); // prevent overflow

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const paginatedData = filteredData.slice(
          startIndex,
          startIndex + this.pageSize
        );

        this.noDataToDisplay = paginatedData.length === 0;
        this.isLoading = false;

        return this.formatData(paginatedData);
      })
    );
  }

  private transformData(paginatedData: Guest[]) {
    return paginatedData.map((guest) => ({
      _id: guest._id,
      'First Name': guest.firstName,
      'Last Name': guest.lastName,
      DOB: guest.dob,
      Address: guest.address,
      Phone: guest.phone,
      Email: guest.email,
    }));
  }

  private formatData(transformedData: any[]) {
    return {
      headers: Array.isArray(Object.keys(transformedData[0]))
      ? Object.keys(transformedData[0]).filter((key) => key !== '_id')
      : [],
      rows: transformedData,
    };
  }
  

  private filterData(guest: any[], query: string): any[] {
    return guest.filter((guest) =>
      Object.values(guest).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }

    loadInitialData() {
      this.isLoading = true;
      this.guestService
        .getAllGuest()
        .pipe(take(1))
        .subscribe((guests) => {
          this.allData = this.transformData(guests); // full dataset transformed
          this.isLoading = false;
          this.filterDataOnSearch(); // then filtered & paginated
        });
    }
  
    handleSearchQuery() {
      combineLatest([
        this.storeService.searchQuery$,
        this.storeService.sortAscending$,
      ]).subscribe(() => {
        this.filterDataOnSearch();
      });
    }
  
    filterDataOnSearch() {
      
      const query = this.storeService?.searchQuerySubject?.getValue();
      const isAscending = this.storeService.sortAscendingSubject.getValue();
  
      let filtered = this.filterData(this.allData, query);
      filtered = this.sortRoomsByName(filtered, isAscending);
  
      this.totalPages = Math.ceil(filtered.length / this.pageSize);
      this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
  
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const paginated = filtered.slice(startIndex, startIndex + this.pageSize);
  
      this.noDataToDisplay = paginated.length === 0;
      
      const formatted = this.formatData(paginated);
      this.guests$ = of(formatted); // this component's display
      this.storeService.setRooms(formatted?.rows); // 🔥 store the data globally
    }
    
    private sortRoomsByName(rooms: any[], isAscending: boolean | null): any[] {
      if (isAscending === null) return rooms; // Don't sort if null
      
      return rooms.sort((a, b) => {
        const nameA = a['Room Number'].toLowerCase();
        const nameB = b['Room Number'].toLowerCase();
        return isAscending
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    }
}
