import { NgModule } from '@angular/core';
import { TableModule as PrimeNgTableModule } from 'primeng/table';
import { FilterService } from 'primeng/api';
import { SharedModule } from '@app/shared';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent],
  imports: [SharedModule, PrimeNgTableModule],
  exports: [TableComponent],
  providers: [FilterService],
})
export class TableModule {}
