import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@app/commons/button/button.module';
import { FormControlPipe } from '@app/pipes/control-pipe';
import { ZorroAntdModule } from './ng-zorro.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, ZorroAntdModule, ButtonModule],
  declarations: [FormControlPipe],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, ZorroAntdModule, ButtonModule, FormControlPipe],
})
export class SharedLibraryModule {}
