import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FunctionService } from '../../../services/functions/function.service';
import { FunctionServiceFactory } from '../../../services/functions/function.service-factory';
import { FunctionServiceRoom } from '../../../services/functions/function-services/function.service-room';
import { TableData } from '../../../models/room';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  // dynamicHeader: string[] = []
  tableData: any[] = []
  @Input() dynamicTableData: TableData = { headers: [], rows: [] };
  @Output() deleteRow = new EventEmitter<any>(); // can emit the whole row or just ID
  @Input() rows: any;
  

  constructor( 
    private functionServiceFactory: FunctionServiceFactory,
    private functionService: FunctionService,
    private modalService: ModalService){}

  ngOnInit(): void {
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

  // onDelete(row: any) {
  //   this.deleteRow.emit(row); // emit to parent
  // }

  triggerDelete(row: any){
    this.modalService.openDialog('deleteModal', row)
  }

  onConfirmDelete(row: any) {
    this.deleteRow.emit(row)
  }
}
