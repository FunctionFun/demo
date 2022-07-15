import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // 状态栏字体设为默认的黑色
      this.statusBar.styleDefault();
      // 状态了背景设为白色
      this.statusBar.backgroundColorByHexString('#ffffff');
      // 隐藏启动页
      this.splashScreen.hide();
    });
  }
}
