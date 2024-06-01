import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ValidatorComponent } from './validator.component';

@NgModule({
  declarations: [ValidatorComponent],
  exports: [ValidatorComponent],
  imports: [CommonModule, TranslateModule],
})
export class ValidatorModule {}
