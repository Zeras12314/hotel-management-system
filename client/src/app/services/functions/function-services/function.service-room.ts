import { Injectable, OnInit } from "@angular/core";
import { Room } from "src/app/models/room";
import { RoomService } from "../../room.service";

@Injectable({
    providedIn: 'root'  // This makes it available application-wide
  })
  
export class FunctionServiceRoom implements OnInit{
    dynamicHeader = [  'Room no.', 'Category', 'Capacity', 'Price per night', 'Room Status'];
    tableData: Room[] = [];

    constructor(private roomService: RoomService){
        console.log('FROM ROOM FUNCTION SERVICE');
        this.getAllRoom();

    }

    ngOnInit(): void {
      }

      getAllRoom() {
        this.roomService.getAllRoom().subscribe((rooms: Room[]) => {
            this.tableData = rooms;
    //       this.transformedRooms = rooms.map((room) => ({
    //         id : room._id,
    //         'Room Number': room.roomNumber,
    //         Category: room.category,
    //         Capacity: room.capacity,
    //         Price: 'P' + room.pricePerNight,
    //         'Room Status': room.status,
    //       }));
    // 
    //       // extract room table header
    //       for (const key in this.transformedRooms[0]) {
    //         if (key !== 'rooms._id') {
    //           this.roomTableHeader.push(key);
    //         }
    //       }
        });
      }
}