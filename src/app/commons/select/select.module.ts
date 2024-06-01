import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroAntdModule } from '@app/shared/ng-zorro.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SelectComponent } from './select.component';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, TranslateModule, ZorroAntdModule, FormsModule],
  exports: [SelectComponent],
})
export class SelectModule {}
