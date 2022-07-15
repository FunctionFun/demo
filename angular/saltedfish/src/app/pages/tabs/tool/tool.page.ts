import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tool',
  templateUrl: 'tool.page.html',
  styleUrls: ['tool.page.scss']
})
export class ToolPage {

  tools = [
    {
      name: '日常小工具',
      list: [{
        name: 'TODO',
        path: 'todo'
      }]
    },
    {
      name: '实用小工具',
      list: [{
        name: '手电筒',
        path: 'flashlight'
      }, {
        name: '扫码',
        path: 'scan'
      }]
    },
    {
      name: '其他',
      list: [{
        name: '生成二维码',
        path: 'qrcode'
      }]
    }
  ];

  constructor(
    private navCtrl: NavController,
  ) {}

  goToDetail(item: any) {
    this.navCtrl.navigateForward(`/${item.path}`);
  }
}
