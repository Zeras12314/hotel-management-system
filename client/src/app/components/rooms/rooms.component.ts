import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room, TableData } from 'src/app/models/room';
import { FunctionService } from 'src/app/services/functions/function.service';
import { FunctionServiceFactory } from 'src/app/services/functions/function.service-factory';
import { StoreService } from 'src/app/services/store/store.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  functionService: FunctionService;
  currentPage = 'ROOM';
  rooms: Room[];
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
    private functionServiceFactory: FunctionServiceFactory,

  ) {

    // Set the initial value in the store when this components loads
    this.storeService.setValue(this.currentPage);
    this.functionService = this.functionServiceFactory.getFunctionService();
  }

  ngOnInit(): void {
    
    this.getAllRoom();
  }

  getAllRoom() {
    this.roomService.getAllRoom().subscribe((rooms: Room[]) => {
      this.transformedRooms = rooms.map(({ _id, ...room }) => ({
        'Room Number': room.roomNumber,
        Category: room.category,
        Capacity: room.capacity,
        Price: 'P' + room.pricePerNight,
        'Room Status': room.status,
      }));
  
      // Dynamically extract headers from the transformed data
      if (this.transformedRooms.length > 0) {
        this.roomTableData = {
          headers: Object.keys(this.transformedRooms[0]), // Get headers from the first room object
          rows: this.transformedRooms,
        };
      }
    });
  }


  

  deleteRoom(id) {}
}
