import { Component, OnInit } from '@angular/core';
import { province } from 'src/app/services/location/province.js';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  provinceList = province;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  chooseItem(item) {
    this.navCtrl.navigateForward(`/location/${item.id}/city`);
  }
}
