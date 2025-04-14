import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.scss']
})
export class PopUpModalComponent implements OnInit {
  rowData: any;

  @Output() confirmed = new EventEmitter<any>();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modalState$.subscribe((state) => {
      if (state && state.id === 'deleteModal' && state.action === 'open') {
        this.rowData = state.data;
      }
    });
  }

  confirmDelete() {
    this.confirmed.emit(this.rowData);
    this.modalService.closeDialog('deleteModal');
  }

  close() {
    this.modalService.closeDialog('deleteModal');
  }
}