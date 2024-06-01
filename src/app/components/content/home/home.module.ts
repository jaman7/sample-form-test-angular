import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from '@app/commons/table/table.module';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, TranslateModule, TableModule],
})
export class HomeModule {}
