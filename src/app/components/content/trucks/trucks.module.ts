import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from '@app/commons/table/table.module';
import { ModalModule } from '@app/commons/modal/modal.module';
import { FormElementsModule } from '@app/commons/form-elements/form-elements.module';
import { TreeViewModule } from '@app/commons/tree-view/tree-view.module';
import { TrucksRoutingModule } from './trucks-routing.module';
import { TrucksComponent } from './trucks.component';
import { TrucksEditComponent } from './trucks-edit/trucks-edit.component';

@NgModule({
  declarations: [TrucksComponent, TrucksEditComponent],
  imports: [SharedModule, TrucksRoutingModule, TranslateModule, TableModule, ModalModule, FormElementsModule, TreeViewModule],
})
export class TrucksModule {}
