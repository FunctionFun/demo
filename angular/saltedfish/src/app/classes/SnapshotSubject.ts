import { BehaviorSubject, Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

/** 带快照的可订阅主题 */
export class SnapshotSubject<T> {
  /** 快照 */
  snapshot: T = null;

  private innerSubject: BehaviorSubject<T> = null;

  constructor(initialValue: T) {
    this.snapshot = initialValue;
    this.innerSubject = new BehaviorSubject(initialValue);
  }

  /** 设置新的数值 */
  set(value: T) {
    this.snapshot = value;
    this.innerSubject.next(value);
  }

  /** 订阅主题 */
  subscribe(next?: (value: T) => void, ignoreInitialValue: boolean = false): Subscription {
    if (!ignoreInitialValue) {
      return this.innerSubject.subscribe(next);
    } else {
      return this.innerSubject.pipe(skip(1)).subscribe(next);
    }
  }
}
