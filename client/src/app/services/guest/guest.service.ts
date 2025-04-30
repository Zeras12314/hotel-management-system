import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Guest } from 'src/app/models/header.model';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllGuest(): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/guest`);
  }
}
