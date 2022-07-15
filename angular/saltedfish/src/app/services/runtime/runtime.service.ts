import { Injectable, Inject } from '@angular/core';
import { SnapshotSubject } from 'src/app/classes/SnapshotSubject';
import { StoreService } from 'src/app/services/store/store.service';

/** 所在城市 */
export interface Location {
  provinceId: string;
  cityId: string;
  cityName: string;
  countyId: string;
  countyName: string;
}

@Injectable({
  providedIn: 'root',
})
export class RuntimeService {
  location: SnapshotSubject<Location> = new SnapshotSubject(null);

  constructor(
    @Inject('LocationStore') private locationStore: StoreService<Location>
  ) {}

  /** 改变当前城市时调用 */
  changeLocation(location: Location) {
    this.location.set(location);
    this.locationStore.save(this.location.snapshot);
  }
}
