import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Api } from './services/api/api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { StoreService } from 'src/app/services/store/store.service';

import { RuntimeService, Location } from 'src/app/services/runtime/runtime.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot({
    name: '__saltedfish',
  })],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Api,
    InAppBrowser,
    QRScanner,
    { provide: 'LocationStore', useFactory: () => new StoreService<Location>(inject(Storage), 'location') },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
