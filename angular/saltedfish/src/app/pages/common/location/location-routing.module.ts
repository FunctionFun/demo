import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationPage } from './location.page';

const routes: Routes = [
  {
    path: '',
    component: LocationPage
  },
  {
    path: ':provinceId/city',
    loadChildren: () => import('./city/city.module').then( m => m.CityPageModule)
  },
  {
    path: ':provinceId/city/:cityId/county',
    loadChildren: () => import('./county/county.module').then( m => m.CountyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationPageRoutingModule {}
