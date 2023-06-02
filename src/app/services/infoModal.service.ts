import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoModalService {
  private modalVisibleSubject = new BehaviorSubject<boolean>(false);
  modalVisible$ = this.modalVisibleSubject.asObservable();

  openModal() {
    this.modalVisibleSubject.next(true);
  }

  closeModal() {
    this.modalVisibleSubject.next(false);
  }
}
