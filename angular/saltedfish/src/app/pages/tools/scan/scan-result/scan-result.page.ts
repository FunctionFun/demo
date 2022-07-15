import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.page.html',
  styleUrls: ['./scan-result.page.scss'],
})
export class ScanResultPage implements OnInit {

  content = '';
  isUrl = false;

  constructor(
    private route: ActivatedRoute,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    console.log('route', this.route.snapshot);
    const route = this.route.snapshot;
    if (route && route.queryParams && route.queryParams.str) {
      this.content = route.queryParams.str;
      const rule = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
      this.isUrl = rule.test(this.content);
    }
  }

  openUrl() {
    this.iab.create(this.content, '_blank', 'toolbarcolor=#28c3c0,navigationbuttoncolor=#ffffff,closebuttoncolor=#ffffff');
  }

}
