import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'main',
    component: TabsPage,
    children: [
      {
        path: 'index',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./index/index.module').then(m => m.IndexPageModule)
          }
        ]
      },
      {
        path: 'tool',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tool/tool.module').then(m => m.ToolPageModule)
          }
        ]
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('./message/message.module').then( m => m.MessagePageModule)
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
          }
        ]
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            loadChildren: () => import('./mine/mine.module').then( m => m.MinePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/main/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/index',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
