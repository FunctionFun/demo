import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { TipsService } from 'src/app/services/tips/tips.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-webview',
  templateUrl: './webview.page.html',
  styleUrls: ['./webview.page.scss'],
})

export class WebviewPage implements OnInit {

  /** 导航栏标题 */
  title = '';
  /** 当前时间字符串，每次进入页面都会刷新，用于iframe的name属性以强制iframe刷新缓存 */
  private dateStr: string = new Date().toISOString();
  /** 内嵌页面的URL */
  url: SafeResourceUrl = null;
  /** 动态样式，主要用于iOS系统动态调整iframe高度以实现正常的内嵌滚动 */
  iframeStyle: { height?: string } = { height: '100%' };

  constructor(
    private route: ActivatedRoute,
    private tips: TipsService,
    private sanitizer: DomSanitizer,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.dateStr = new Date().toISOString();
    this.tips.showLoading().then(() => {
      let plainUrl: string = this.route.snapshot.queryParams.url;
      const params = new URLSearchParams(plainUrl.substr(plainUrl.indexOf('?')));
      this.title = params.has('title') ? params.get('title') : '';
      // 优先使用navParams的title
      if (this.route.snapshot.queryParams.title) {
        this.title = this.route.snapshot.queryParams.title;
      }
      // 添加随机参数
      if (plainUrl.indexOf('?') > 0) {
        plainUrl += `&dateNonce=${encodeURIComponent(this.dateStr)}`;
      } else {
        plainUrl += `?dateNonce=${encodeURIComponent(this.dateStr)}`;
      }
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(plainUrl);
    });
  }

  onLoaded() {
    this.tips.hideLoading();
  }

}
