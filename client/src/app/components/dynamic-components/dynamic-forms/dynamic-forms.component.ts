// dynamic-forms.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownConstants } from 'src/app/utils/dropdown.constants';
import { RoomService } from 'src/app/services/room/room.service';

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
    private roomService: RoomService
  ) {}

  ngOnInit() {
    // this.modalCall();
    this.addDataFormOnInit();
  }

//   modalCall() {
//     this.modalService.modalState$.subscribe((event) => {
//       if (!event) return;
//       const modalElement = document.getElementById(event.id);
//       if (!modalElement) return;
//       const modal = new Modal(modalElement);
//       this.currentModal = modal
//       if (event.action === 'open') {
//         modal.show();
//       } else {
//         modal.hide();
//       }
// 
//     });
//   }

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
      this.modalService.closeDialog('exampleModal');  // Make sure 'exampleModal' matches the modal's IDz
    });
  }
  
}
