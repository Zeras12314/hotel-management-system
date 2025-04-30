import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest/guest.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss'],
})
export class GuestsComponent implements OnInit {
  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    this.guestService.getAllGuest().subscribe((data) => {
      console.log('Guest Data', data);
    });
  }
}
