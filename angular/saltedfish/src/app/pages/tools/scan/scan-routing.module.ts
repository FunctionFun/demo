import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanPage } from './scan.page';

const routes: Routes = [
  {
    path: '',
    component: ScanPage
  },  {
    path: 'scan-result',
    loadChildren: () => import('./scan-result/scan-result.module').then( m => m.ScanResultPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanPageRoutingModule {}
