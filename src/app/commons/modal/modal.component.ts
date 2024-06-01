import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ButtonsTypes, IModalButtons } from './modal.models';

const { CLOSE } = IModalButtons;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnDestroy {
  @Input() visible = true;

  @Input() header = '';

  @Input() hideDefaultButtons = false;

  @Input() disableOkButton = false;

  @Output() closeEvent = new EventEmitter<void>();

  @Output() okEvent = new EventEmitter<void>();

  width = '';

  maxWidth = '';

  minWidth = '40vw';

  minHeight = 'auto';

  ngOnDestroy(): void {
    this.visible = false;
  }

  onClickOk(): void {
    this.okEvent.emit();
  }

  onClickClose(): void {
    this.closeEvent.emit();
  }
}
