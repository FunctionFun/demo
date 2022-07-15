import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-set',
  templateUrl: './set.page.html',
  styleUrls: ['./set.page.scss'],
})
export class SetPage implements OnInit {

  isLogin = false;

  cacheSize = '24.14M';

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  logout() {
    if (this.isLogin) {
      console.log('退出登录');
    } else {
      console.log('去登录');
      this.goToPath(`/login`);
    }
  }

  // 跳转到某个路径
  goToPath(path: string) {
    this.navCtrl.navigateForward(path);
  }

  // 清除缓存
  clearCache() {
    console.log('清除缓存', this.cacheSize);
  }
}
