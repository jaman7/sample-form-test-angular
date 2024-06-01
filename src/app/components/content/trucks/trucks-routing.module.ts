import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateResolver } from '@app/core';
import { TrucksComponent } from './trucks.component';

const routes: Routes = [
  {
    path: '',
    data: {
      i18n: 'trucks',
    },
    component: TrucksComponent,
    resolve: {
      translate: TranslateResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrucksRoutingModule {}
