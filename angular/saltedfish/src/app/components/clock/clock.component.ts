import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Api } from 'src/app/services/api/api.service';
import moment from 'moment';
import { NavController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store/store.service';
import { RuntimeService, Location } from 'src/app/services/runtime/runtime.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'so-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {
  time = '';
  date = '';
  temperature = '';
  location = '桂林';
  private countDownSubs: Subscription = null;
  private locationSubs: Subscription = null;

  constructor(
    private api: Api,
    private navCtrl: NavController,
    private rs: RuntimeService,
    @Inject('LocationStore') private locationStore: StoreService<Location>
  ) {}

  ngOnInit() {
    // 获取当前时间
    const countdownFn = interval(1000);
    moment.locale('zh-cn');
    this.countDownSubs = countdownFn.subscribe(() => {
      const curDate = moment();
      this.date = curDate.format('YYYY年MM月DD天 dddd');
      this.time = curDate.format('HH:mm:ss');
    });
    // 获取当前城市地区数据
    this.locationStore.load().then(res => {
      this.location = res?.cityName;
    });
    this.locationSubs = this.rs.location.subscribe(value => {
      if (value) {
        console.log('获取当前城市地区数据', value);
        this.location = value.cityName;
        this.getWeather();
      }
    });
    // 获取当前天气
    // TODO：天气接口调试完毕，暂时隐藏，以免过渡调用
    // this.getWeather();
  }

  ngOnDestroy() {
    if (this.countDownSubs) {
      this.countDownSubs.unsubscribe();
    }
    if (this.locationSubs) {
      this.locationSubs.unsubscribe();
    }
  }

  getWeather() {
    console.log('获取当前天气', this.location);
    this.api.getWeather(this.location).then(({ data }) => {
      this.temperature = data.wendu;
    }).catch((error) => {
      console.log(error);
    });
  }

  toggleCity() {
    console.log('切换城市');
    this.navCtrl.navigateForward(`/location`);
  }
}
