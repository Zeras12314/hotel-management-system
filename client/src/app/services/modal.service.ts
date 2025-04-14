// modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modal } from 'bootstrap';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalState = new BehaviorSubject<{
    id: string;
    action: 'open' | 'close';
    data?: any;
  }>(null);
  public modalState$ = this.modalState.asObservable();
  private modalInstances: { [key: string]: Modal } = {};

  // Open modal
  openDialog(modalId: string, data?: any) {
    this.modalState.next({ id: modalId, action: 'open', data });

    // Store the modal instance
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new Modal(modalElement);
      this.modalInstances[modalId] = modal; // Store instance for later use
      modal.show();
    }
  }

  // Close modal
  closeDialog(modalId: string) {
    this.modalState.next({ id: modalId, action: 'close' });

    // 🔒 Blur the focused element before hiding to avoid aria-hidden issue
    (document.activeElement as HTMLElement)?.blur();

    // Close the modal if instance exists
    const modal = this.modalInstances[modalId];
    if (modal) {
      modal.hide();
    }
  }
}
