import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getAllRoom(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/room`)
  }

  deleteRoom(id): Observable<Room[]> {
    return this.http.delete<Room[]>(`${this.apiUrl}/room/${id}`)
  }

  addRoom(room: Room): Observable<Room[]> {
    return this.http.post<Room[]>(`${this.apiUrl}/room`, room)
  }
}
