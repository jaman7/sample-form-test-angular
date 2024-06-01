import { Directive, Host } from '@angular/core';
import { NgForOf } from '@angular/common';

export interface Item {
  id?: number | string;
  [key: string]: any;
}

@Directive({
  selector: '[ngForTrackById]',
})
export class NgForTrackByIdDirective<T extends Item> {
  constructor(@Host() private ngFor: NgForOf<T>) {
    if (this.ngFor) {
      this.ngFor.ngForTrackBy = (index: number, item: T) => item.id;
    }
  }
}
