import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';
import { Room, TableData } from 'src/app/models/room';
import { FunctionService } from 'src/app/services/functions/function.service';
import { FunctionServiceFactory } from 'src/app/services/functions/function.service-factory';
import { StoreService } from 'src/app/services/store/store.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize, map, Observable, take } from 'rxjs';

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

  constructor(
    private roomService: RoomService,
    private storeService: StoreService,
    private functionServiceFactory: FunctionServiceFactory
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
  }

  // Handle page change (without storing in the service)
  onPageChange(page: number) {
    this.currentPage = page;
    this.ngOnInit(); // Re-fetch data for the new page
  }

  getRoomData(){
    this.isLoading = true
    this.rooms$ = this.roomService.getAllRoom().pipe(take(1),
      map((rooms: Room[]) => {
        // pagination calculation
        const totalRooms = rooms.length;
        this.totalPages = Math.ceil(totalRooms / this.pageSize);

        const startIndex = (this.currentPage - 1) * this.pageSize;
        const paginatedRooms = rooms.slice(
          startIndex,
          startIndex + this.pageSize
        );

        const transformedRooms =paginatedRooms.map(({ _id, ...room }) => ({
          'Room Number': room.roomNumber,
          Category: room.category,
          Capacity: room.capacity,
          Price: 'P' + room.pricePerNight,
          'Room Status': room.status,
        }));

        return {
          headers: transformedRooms.length
            ? Object.keys(transformedRooms[0])
            : [],
          rows: transformedRooms,
        };
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
