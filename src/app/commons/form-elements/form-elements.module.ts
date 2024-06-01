import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { FormElementsComponent } from './form-elements.component';
import { InputModule } from '../input/input.module';
import { ValidatorModule } from '../validator/validator.module';
import { SelectModule } from '../select/select.module';

@NgModule({
  declarations: [FormElementsComponent],
  imports: [CommonModule, SharedModule, InputModule, SelectModule, ValidatorModule],
  exports: [FormElementsComponent],
})
export class FormElementsModule {}
