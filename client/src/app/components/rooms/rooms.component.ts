import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';
import { Room, TableData } from 'src/app/models/room';
import { FunctionService } from 'src/app/services/functions/function.service';
import { FunctionServiceFactory } from 'src/app/services/functions/function.service-factory';
import { StoreService } from 'src/app/services/store/store.service';
import { combineLatest, finalize, map, Observable, of, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  functionService: FunctionService;
  currentPageUrl;
  rooms$: Observable<TableData>; // Use Observable for async pipe
  transformedRooms: {
    'Room Number': string;
    Category: string;
    Capacity: number;
    Price: string;
    'Room Status': string;
  }[] = [];
  // for pagination
  currentPage: number;
  totalPages: number;
  pageSize: number = 10; // Number of rows per page
  isLoading: boolean = false;
  roomTableData: TableData = { headers: [], rows: [] }; // Initialize properly
  noDataToDisplay: boolean = false;
  allRooms: any[] = [];

  constructor(
    private roomService: RoomService,
    private storeService: StoreService,
    private functionServiceFactory: FunctionServiceFactory,
    private toastr: ToastrService
  ) {
    // Set initial page number
    this.currentPage = 1; // Start at the first page
    // Set the initial value in the store when this components loads
    this.storeService.setCurrentPage();
    this.functionService = this.functionServiceFactory.getFunctionService();
    this.currentPageUrl = this.storeService.getCurrentPage();
  }

  ngOnInit(): void {
    this.getRoomData();

    // Listen for changes to search query and sort order
    this.storeService.sortAscending$.subscribe(() => {
      this.filterRoomsOnSearch(); // Trigger search filtering and sorting
    });

    // 🧠 Listen for refresh trigger
    this.storeService.onRoomRefresh().subscribe(() => {
      this.getRoomData(); // Refresh data when a new room is added
      this.isLoading = false
    });

    this.loadInitialRooms();
    this.handleSearchQuery(); // handle search filtering reactively
  }

  // Handle page change (without storing in the service)
  onPageChange(page: number) {
    this.currentPage = page;
    this.ngOnInit(); // Re-fetch data for the new page
  }

  getRoomData() {
    this.isLoading = true;

    this.rooms$ = combineLatest([
      this.roomService.getAllRoom().pipe(take(1)),
      this.storeService.searchQuery$,
    ]).pipe(
      map(([rooms, query]) => {
        const transformedRooms = this.transformRooms(rooms); // transform first
        const filteredRooms = this.filterRooms(transformedRooms, query); // filter full dataset

        this.totalPages = Math.ceil(filteredRooms.length / this.pageSize);
        this.currentPage = Math.min(this.currentPage, this.totalPages || 1); // prevent overflow

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const paginatedRooms = filteredRooms.slice(
          startIndex,
          startIndex + this.pageSize
        );

        this.noDataToDisplay = paginatedRooms.length === 0;
        this.isLoading = false;

        return this.formatData(paginatedRooms);
      })
    );
  }

  private transformRooms(paginatedRooms: Room[]) {
    return paginatedRooms.map((room) => ({
      _id: room._id,
      'Room Number': room.roomNumber,
      Category: room.category,
      Capacity: room.capacity,
      Price: 'P' + room.pricePerNight,
      'Room Status': room.status,
    }));
  }

  private formatData(transformedRooms: any[]) {
    return {
      headers: transformedRooms.length
        ? Object.keys(transformedRooms[0]).filter((key) => key !== '_id')
        : [],
      rows: transformedRooms,
    };
  }

  onDeleteRow(row: any) {
    this.isLoading = true;
    this.roomService
      .getAllRoom()
      .pipe(take(1))
      .subscribe({
        next: (rooms: Room[]) => {
          const totalItems = rooms.length - 1; // subtract 1 to simulate deletion
          const totalPagesAfterDelete = Math.ceil(totalItems / this.pageSize);

          if (this.currentPage > totalPagesAfterDelete) {
            this.currentPage = Math.max(totalPagesAfterDelete, 1); // go back a page if needed
          }

          this.roomService
            .deleteRoom(row._id)
            .pipe(
              finalize(() => {
                this.getRoomData(); // refresh updated data
                this.isLoading = false;
              })
            )
            .subscribe({
              next: () => {
                this.toastr.success('Room deleted successfully!', 'Success');
              },
              error: (err) => {
                console.error(err);
                // Display error message using toastr
                this.toastr.error(
                  'Failed to delete room. Please try again later.',
                  'Error'
                );
              },
            });
        },
        error: (err) => {
          console.error(err);
          // Handle error from getAllRoom request
          this.toastr.error(
            'Failed to fetch room data. Please try again later.',
            'Error'
          );
        },
      });
  }

  private filterRooms(rooms: any[], query: string): any[] {
    return rooms.filter((room) =>
      Object.values(room).some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }

  loadInitialRooms() {
    this.isLoading = true;
    this.roomService
      .getAllRoom()
      .pipe(take(1))
      .subscribe((rooms) => {
        this.allRooms = this.transformRooms(rooms); // full dataset transformed
        this.isLoading = false;
        this.filterRoomsOnSearch(); // then filtered & paginated
      });
  }

  handleSearchQuery() {
    combineLatest([
      this.storeService.searchQuery$,
      this.storeService.sortAscending$,
    ]).subscribe(() => {
      this.filterRoomsOnSearch();
    });
  }

  filterRoomsOnSearch() {
    const query = this.storeService.searchQuerySubject.getValue();
    const isAscending = this.storeService.sortAscendingSubject.getValue();

    let filtered = this.filterRooms(this.allRooms, query);
    filtered = this.sortRoomsByName(filtered, isAscending);

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const paginated = filtered.slice(startIndex, startIndex + this.pageSize);

    this.noDataToDisplay = paginated.length === 0;

    const formatted = this.formatData(paginated);
    this.rooms$ = of(formatted); // this component's display
    this.storeService.setRooms(formatted.rows); // 🔥 store the data globally
  }

  //Sort by Room Number
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

  onSortClickAscending() {
    this.storeService.setSortOrder(true); // Explicitly set to ascending
  }

  onSortClickDescending() {
    this.storeService.setSortOrder(false); // Explicitly set to descending
  }

  onResetFilter() {
    this.storeService.setSortOrder(null); // Reset sorting
  }
}
