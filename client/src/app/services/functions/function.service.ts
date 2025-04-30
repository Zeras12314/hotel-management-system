import { Injectable } from "@angular/core";
import { RoomService } from "../room/room.service";
import { Room } from "src/app/models/header.model";

@Injectable({
    providedIn: 'root',
})

export class FunctionService {
    currentPage = '';
    dynamicHeader: string[] = [];
    tableData: Room[] = [];
    constructor(private roomService: RoomService){}
}