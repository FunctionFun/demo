import { Component, OnInit } from '@angular/core';
import { city } from 'src/app/services/location/city.js';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  provinceId = '';
  cityList = [];

  constructor(private navCtrl: NavController, private ar: ActivatedRoute) { }

  ngOnInit() {
    const {
      snapshot: { params },
    } = this.ar;
    this.provinceId = params.provinceId;
    this.cityList = city[this.provinceId];
  }

  chooseItem(item) {
    this.navCtrl.navigateForward(`/location/${this.provinceId}/city/${item.id}/county`);
  }

}
