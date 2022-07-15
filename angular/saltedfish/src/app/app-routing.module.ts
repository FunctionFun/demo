import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'webview',
    loadChildren: () => import('./pages/common/webview/webview.module').then( m => m.WebviewPageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/tools/qrcode/qrcode.module').then( m => m.QrcodePageModule)
  },
  {
    path: 'scan',
    loadChildren: () => import('./pages/tools/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'flashlight',
    loadChildren: () => import('./pages/tools/flashlight/flashlight.module').then( m => m.FlashlightPageModule)
  },
  {
    path: 'todo',
    loadChildren: () => import('./pages/tools/todo/todo.module').then( m => m.TodoPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/common/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'find',
    loadChildren: () => import('./pages/find/find.module').then(m => m.FindPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/account/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/account/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'set',
    loadChildren: () => import('./pages/common/set/set.module').then( m => m.SetPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/common/about/about.module').then( m => m.AboutPageModule)
  },  {
    path: 'feedback',
    loadChildren: () => import('./pages/common/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
