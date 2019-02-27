import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.change.emit();
  }
  constructor() { }
}
