import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {
  avatar = '';

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  // 跳转到设置页
  goToSet() {
    this.navCtrl.navigateForward(`/set`);
  }
}
