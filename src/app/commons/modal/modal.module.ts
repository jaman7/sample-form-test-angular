import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { DialogModule } from 'primeng/dialog';
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [SharedModule, DialogModule],
  exports: [ModalComponent],
})
export class ModalModule {}
