import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss']
})
export class IndexPage {

  constructor(
    private navCtrl: NavController,
  ) {}

  // 跳转到扫描页
  goToScan() {
    this.navCtrl.navigateForward(`/scan`);
  }

  // 跳转到搜索页
  goToFind() {
    this.navCtrl.navigateForward(`/find`);
  }
}
