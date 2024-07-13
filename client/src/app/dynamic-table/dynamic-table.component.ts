import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  ngOnInit(): void {}

  setStatusStyle(column: string, value: any): string {
    if (column === 'Room Status') {
      switch (value) {
        case 'Available':
          return 'status-available';
        case 'Occupied':
          return 'status-occupied';
        case 'Under Maintenance':
          return 'status-maintenance';
        case 'Booked':
          return 'status-booked';
         case 'Reserved':
          return 'status-reserved';
        default:
          return '';
      }
    }
    return ''
  }
}
