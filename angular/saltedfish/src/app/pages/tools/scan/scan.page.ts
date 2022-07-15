import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { TipsService } from 'src/app/services/tips/tips.service';
import { BrowserQRCodeReader } from '@zxing/library';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  // 控制闪光灯
  light = false;

  constructor(
    private navCtrl: NavController,
    private qrScanner: QRScanner,
    private tips: TipsService,
  ) {}

  ngOnInit() {
    this.openCamera();
  }

  // 页面即将关闭
  ionViewCanLeave() {
    // 关闭页面时，将闪光灯关闭
    this.qrScanner.disableLight();
    // 将qrScanner销毁掉
    this.qrScanner.destroy();
    this.qrScanner.hide();
  }

  // 打开闪光灯功能
  toggleLight() {
    this.light = !this.light;

    if (this.light) {
      this.qrScanner.enableLight();
    } else {
      this.qrScanner.disableLight();
    }

    this.tips.makeToast(this.light ? '打开闪光灯' : '关闭闪光灯');
  }

  // 打开相机扫描
  openCamera() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          // 将摄像头默认成后置摄像头
          this.qrScanner.useBackCamera();
          // 显示相机预览
          this.qrScanner.show();
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.goResult(text);
            // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.qrScanner.openSettings();
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  // 打开相册选择图片
  openImage($event) {
    const files = $event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const urlPath = URL.createObjectURL(file);
      this.deQrcode(urlPath);
      // console.log('解码', res);
    }
  }

  deQrcode(path) {
    // tslint:disable-next-line: deprecation
    const codeReader = new BrowserQRCodeReader();
    codeReader
      .decodeFromImage(undefined, path)
      .then((result) => {
        console.log('解码', {...result});
        const str: any = {
          ...result
        };
        this.goResult(str.text);
      })
      .catch((err) => console.error(err));
  }

  goResult(str) {
    this.navCtrl.navigateRoot(`/scan/scan-result?str=${str}`);
  }
}
