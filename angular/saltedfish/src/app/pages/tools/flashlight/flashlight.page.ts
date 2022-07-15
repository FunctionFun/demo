import { Component, OnInit } from '@angular/core';
// import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-flashlight',
  templateUrl: './flashlight.page.html',
  styleUrls: ['./flashlight.page.scss'],
})
export class FlashlightPage implements OnInit {

  isLight = false;

  constructor(
    // private flashlight: Flashlight
  ) { }

  ngOnInit() {
  }

  toggleSwitch() {
    this.isLight = !this.isLight;
    // if (this.isLight) {
    //   this.flashlight.switchOn();
    // } else {
    //   this.flashlight.switchOff();
    // }
  }
}
