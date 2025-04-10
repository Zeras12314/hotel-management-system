// dynamic-forms.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownConstants } from 'src/app/utils/dropdown.constants';
import { RoomService } from 'src/app/services/room/room.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
})
export class DynamicFormsComponent implements OnInit {
  roomCategories = DropdownConstants.ROOM_CATEGORIES;
  roomStatus = DropdownConstants.ROOM_STATUS;
  addDataForm: FormGroup;
  modalData: any[] = []; // Array to store modal data
  currentModal;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private roomService: RoomService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.addDataFormOnInit();
  }

  addDataFormOnInit() {
    this.addDataForm = this.fb.group({
      roomNumber: ['', [Validators.required]],
      capacity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      category: ['', [Validators.required]],
      pricePerNight: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      status: ['', [Validators.required]],
    });
  }

  addData() {
    const newRoom = this.addDataForm.value;
    this.roomService.addRoom(newRoom).subscribe((res) => {
      console.log(res);
       // Close the modal via the ModalService
      this.modalService.closeDialog('exampleModal');

      // Tell the app: "Room data changed, refresh it!"
      this.storeService.triggerRoomRefresh();
    });
  }
  
}
