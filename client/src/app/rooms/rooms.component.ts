import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[];
  transformedRooms: {
    'Room Number': string;
    Category: string;
    Capacity: number;
    Price: string;
    'Room Status': string;
  }[] = [];
  roomTableHeader = [];

  constructor(private roomService: RoomService) {}

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
