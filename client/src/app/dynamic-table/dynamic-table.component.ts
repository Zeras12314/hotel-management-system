import { Component, Input, OnInit } from '@angular/core';
import { FunctionService } from '../services/functions/function.service';
import { FunctionServiceFactory } from '../services/functions/function.service-factory';
import { FunctionServiceRoom } from '../services/functions/function-services/function.service-room';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  dynamicHeader: string[] = []
  tableData: any[] = []

  constructor( 
    private functionServiceFactory: FunctionServiceFactory,
    private functionService: FunctionService){}

  ngOnInit(): void {
    const functionService = this.functionServiceFactory.getFunctionService();
    this.dynamicHeader = functionService.dynamicHeader;

    const interval = setInterval(() => {
      if (functionService.tableData.length > 0) {
        this.tableData = functionService.tableData;
        console.log("Updated tableData:", this.tableData);
        clearInterval(interval); // Stop checking
      }
    }, 100);

  }

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
