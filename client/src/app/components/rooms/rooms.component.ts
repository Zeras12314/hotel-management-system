import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';
import { FunctionService } from 'src/app/services/functions/function.service';
import { FunctionServiceFactory } from 'src/app/services/functions/function.service-factory';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  functionService: FunctionService
  currentPage = 'ROOM'
  rooms: Room[];
  transformedRooms: {
    'Room Number': string;
    Category: string;
    Capacity: number;
    Price: string;
    'Room Status': string;
  }[] = [];
  roomTableHeader = [];


  constructor(private roomService: RoomService, 
    private storeService: StoreService,
    private functionServiceFactory: FunctionServiceFactory,

  ) {
     // Set the initial value in the store when this components loads
    this.storeService.setValue(this.currentPage)
    this.functionService = this.functionServiceFactory.getFunctionService();


  }

  ngOnInit(): void {
    this.getAllRoom();
  }

  getAllRoom() {
    this.roomService.getAllRoom().subscribe((rooms: Room[]) => {
      this.transformedRooms = rooms.map((room) => ({
        id : room._id,
        'Room Number': room.roomNumber,
        Category: room.category,
        Capacity: room.capacity,
        Price: 'P' + room.pricePerNight,
        'Room Status': room.status,
      }));

      // extract room table header
      for (const key in this.transformedRooms[0]) {
        if (key !== 'rooms._id') {
          this.roomTableHeader.push(key);
        }
      }
    });
  }

  deleteRoom(id){

  }
}
