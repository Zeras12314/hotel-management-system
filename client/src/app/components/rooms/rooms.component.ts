import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';
import { Room, TableData } from 'src/app/models/room';
import { FunctionService } from 'src/app/services/functions/function.service';
import { FunctionServiceFactory } from 'src/app/services/functions/function.service-factory';
import { StoreService } from 'src/app/services/store/store.service';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  functionService: FunctionService;
  currentPage;
  rooms$: Observable<TableData>; // Use Observable for async pipe
  transformedRooms: {
    'Room Number': string;
    Category: string;
    Capacity: number;
    Price: string;
    'Room Status': string;
  }[] = [];

  roomTableData: TableData = { headers: [], rows: [] }; // Initialize properly

  constructor(
    private roomService: RoomService,
    private storeService: StoreService,
    private functionServiceFactory: FunctionServiceFactory
  ) {
    // Set the initial value in the store when this components loads
    this.storeService.setCurrentPage();
    this.functionService = this.functionServiceFactory.getFunctionService();
    this.currentPage = this.storeService.getCurrentPage();
  }

  ngOnInit(): void {
    this.rooms$ = this.roomService.getAllRoom().pipe(
      map((rooms: Room[]) => {
        const transformedRooms = rooms.map(({ _id, ...room }) => ({
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
      })
    );
  }
}
