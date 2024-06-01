import { NzMessageService } from 'ng-zorro-antd/message';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { StepBackwardOutline, CaretLeftOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzI18nModule, NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

const icons: IconDefinition[] = [StepBackwardOutline, CaretLeftOutline, SettingOutline];

@NgModule({
  exports: [
    NzButtonModule,
    NzDropDownModule,
    NzI18nModule,
    NzIconModule,
    NzToolTipModule,
    NzSelectModule,
    NzInputModule,
    NzInputNumberModule,
  ],
  imports: [NzIconModule.forChild(icons)],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }, { provide: NzMessageService }],
})
export class ZorroAntdModule {}
