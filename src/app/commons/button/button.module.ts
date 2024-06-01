import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ZorroAntdModule } from '@app/shared/ng-zorro.module';
import { DirectivesModule } from '@app/shared/directives/directives.module';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, TranslateModule, NzIconModule, ZorroAntdModule, DirectivesModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
