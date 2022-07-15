import { Component, OnInit } from '@angular/core';
import { TipsService } from 'src/app/services/tips/tips.service';
import moment from 'moment';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  content = '';
  showQrCode = false;

  constructor(private tips: TipsService) {}

  ngOnInit() {}

  submitContent(e: any) {
    e.preventDefault();
  }

  generateQrCode() {
    if (!this.content) {
      this.tips.alert('请填写生成内容');
    }
    this.showQrCode = true;
    console.log(this.showQrCode);
  }

  saveQrCode() {
    const canvas = document.querySelector('canvas');
    const imgURL = canvas.toDataURL('jpg');
    const alink = document.createElement('a');
    alink.href = imgURL;
    const suffix = moment().format('YYYYMMDDHHmmss');
    alink.download = 'qrcode' + '-' + suffix;
    alink.click();
  }
}
