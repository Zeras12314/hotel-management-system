// dynamic-forms.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Modal } from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownConstants } from 'src/app/utils/dropdown.constants';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
})
export class DynamicFormsComponent implements OnInit {
  roomCategories = DropdownConstants.ROOM_CATEGORIES;
  roomStatus = DropdownConstants.ROOM_STATUS;
  modalData: any; // Variable to store modal data
  addDataForm: FormGroup;
  

  constructor(private modalService: ModalService, private fb: FormBuilder) {}

  ngOnInit() {
    this.modalCall();
    this.addDataFormOnInit()

  }

  modalCall() {
    this.modalService.modalState$.subscribe((event) => {
      if (!event) return;
      const modalElement = document.getElementById(event.id);
      if (!modalElement) return;
      const modal = new Modal(modalElement);

      if (event.action === 'open') {
        modal.show();
      } else {
        modal.hide();
      }
    });
  }

  addDataFormOnInit(){
    this.addDataForm = this.fb.group({
      roomNumber: ['',[Validators.required]],
      capacity: ['',[Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]+$') ]],
      category: ['',[Validators.required, ]],
      pricePerNight: ['',[Validators.required,  Validators.pattern('^[0-9]+$')]],
      status: ['',[Validators.required,]],
    })
  }

  addData(){
    console.log(this.addDataForm)
    console.log('status:', this.addDataForm.invalid)
  }
}
