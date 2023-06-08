import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public spinner$: Subject<any>;

  constructor() {
    this.spinner$ = new Subject<any>();
  }

  showSpinner() {
    console.log("show spinner");
    this.spinner$.next(true);
  }

  hideSpinner() {
    console.log("hide spinner");
    this.spinner$.next(false);
  }
}
