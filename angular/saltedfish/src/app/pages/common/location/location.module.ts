import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPageRoutingModule } from './location-routing.module';
import { ItemModule } from 'src/app/components/item/item.module';

import { LocationPage } from './location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPageRoutingModule,
    ItemModule
  ],
  declarations: [LocationPage]
})
export class LocationPageModule {}
