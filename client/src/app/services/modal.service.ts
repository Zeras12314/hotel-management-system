// modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalState = new BehaviorSubject<{id: string, action: 'open'|'close', data?: any}>(null);
  public modalState$ = this.modalState.asObservable();

  openDialog(modalId: string, data?: any) {
    console.log('openDialog called with modalId:', modalId, 'and data:', data); // Add this log
    this.modalState.next({ id: modalId, action: 'open', data });
  }
  

  closeDialog(modalId: string) {
    this.modalState.next({id: modalId, action: 'close'});
  }
}