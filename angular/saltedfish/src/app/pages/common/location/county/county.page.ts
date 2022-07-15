import { Component, OnInit, Inject } from '@angular/core';
import { county } from 'src/app/services/location/county.js';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RuntimeService, Location } from 'src/app/services/runtime/runtime.service';
import { StoreService } from 'src/app/services/store/store.service';
import { Utils } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-county',
  templateUrl: './county.page.html',
  styleUrls: ['./county.page.scss'],
})
export class CountyPage implements OnInit {
  provinceId = '';
  cityId = '';
  countyList = [];
  backUrl;

  constructor(
    private navCtrl: NavController,
    private ar: ActivatedRoute,
    private rs: RuntimeService,
    @Inject('LocationStore') private locationStore: StoreService<Location>
  ) {}

  ngOnInit() {
    const {
      snapshot: { params, queryParams },
    } = this.ar;
    this.provinceId = params.provinceId;
    this.cityId = params.cityId;
    this.countyList = county[this.cityId];
    this.backUrl = queryParams.back;
  }

  chooseItem(item) {
    console.log('地区', item);
    const params: Location = {
      provinceId: this.provinceId,
      cityId: this.cityId,
      cityName: item.city,
      countyId: item.id,
      countyName: item.name
    };
    this.rs.changeLocation(params);
    this.locationStore.save(params);
    this.goToBack();
  }

  // 返回到之前的页面
  goToBack() {
    if (!Utils.isEmpty(this.backUrl) && this.backUrl.length > 0) {
      const backUrl = typeof this.backUrl === 'string' ? this.backUrl : '/' + this.backUrl.join('/');
      this.navCtrl.navigateForward(backUrl, { replaceUrl: true });
    } else {
      this.navCtrl.navigateForward('/', { replaceUrl: true });
    }
  }
}
