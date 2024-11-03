import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { animation: true } },
  {
    path: 'home',
    loadChildren: () => import('./content/home/home.module').then((mod) => mod.HomeModule),
    data: { animation: true },
  },
  {
    path: 'trucks',
    loadChildren: () => import('./content/trucks/trucks.module').then((mod) => mod.TrucksModule),
    data: { animation: true },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
