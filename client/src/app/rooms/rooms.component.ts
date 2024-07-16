import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  rooms: Room;
  roomColumns = ['Room Number', 'Category', 'Capacity', 'Price', 'Room Status'];
  roomData = [
    {
      'Room Number': 101,
      Category: 'Single',
      Capacity: 1,
      Price: 100,
      'Room Status': 'Available',
    },
    {
      'Room Number': 102,
      Category: 'Double',
      Capacity: 2,
      Price: 150,
      'Room Status': 'Booked',
    },
    {
      'Room Number': 103,
      Category: 'Suite',
      Capacity: 4,
      Price: 300,
      'Room Status': 'Available',
    },
    {
      'Room Number': 104,
      Category: 'Single',
      Capacity: 1,
      Price: 100,
      'Room Status': 'Occupied',
    },
    {
      'Room Number': 105,
      Category: 'Double',
      Capacity: 2,
      Price: 150,
      'Room Status': 'Under Maintenance',
    },
    {
      'Room Number': 106,
      Category: 'Double',
      Capacity: 3,
      Price: 150,
      'Room Status': 'Reserved',
    },
    // Add more objects as needed
  ];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.getAllRoom();
  }

  getAllRoom() {
    this.roomService.getAllRoom().subscribe((rooms) => {
      this.rooms = rooms;
      console.log(this.rooms);
    });
  }
}
