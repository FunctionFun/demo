import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  // Loading组件异步锁，用于控制显示和关闭的时序
  private loadingLock: 'free' | 'locked' = 'free';

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  async makeToast(msg: string, duration?: number, pos?: 'top' | 'middle' | 'bottom'): Promise<HTMLIonToastElement> {
    const activeEl = await this.toastCtrl.getTop();
    if (activeEl) {
      // Toast已存在，先关闭
      await activeEl.dismiss();
    }
    const el = await this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 2000,
      position: pos,
      color: 'dark'
    });
    el.present();
    return el;
  }

  async alert(
    message: string,
    header?: string,
    subHeader?: string,
    btnText?: string,
    onBtnClick?: () => void
  ): Promise<HTMLIonAlertElement> {
    const el = await this.alertCtrl.create({
      header,
      subHeader,
      message,
      buttons: [
        {
          text: btnText ? btnText : '确定',
          handler: onBtnClick
        }
      ],
      backdropDismiss: false
    });
    await el.present();
    return el;
  }

  async showLoading(
    msg?: string,
    spin?: 'bubbles' | 'circles' | 'crescent' | 'dots' | 'lines' | 'lines-small' | null | undefined
  ): Promise<HTMLIonLoadingElement> {
    // console.warn(`[Tips] showLoading()`);
    await this.waitForLoadingLock();
    const activeEl = await this.loadingCtrl.getTop();
    if (activeEl) {
      // Loading已存在，直接更新内容
      activeEl.message = msg;
      this.releaseLoadingLock();
      return activeEl;
    }

    const el = await this.loadingCtrl.create({ message: msg, spinner: spin });
    await el.present();
    this.releaseLoadingLock();
    return el;
  }

  async hideLoading(): Promise<boolean> {
    // console.warn(`[Tips] hideLoading()`);
    await this.waitForLoadingLock();
    return new Promise(async (resolve, reject) => {
      const activeEl = await this.loadingCtrl.getTop();
      if (activeEl) {
        setTimeout(() => {
          activeEl
            .dismiss()
            .then(resolve)
            .catch(reject)
            .finally(() => {
              this.releaseLoadingLock();
            });
        }, 0);
      } else {
        resolve();
        this.releaseLoadingLock();
      }
    });
  }

  private waitForLoadingLock(): Promise<void> {
    return new Promise(resolve => {
      if (this.loadingLock === 'free') {
        this.loadingLock = 'locked';
        resolve();
        return;
      }

      const timer = setInterval(() => {
        if (this.loadingLock === 'free') {
          clearInterval(timer);
          this.loadingLock = 'locked';
          resolve();
          return;
        }
      }, 30);
    });
  }

  private releaseLoadingLock() {
    this.loadingLock = 'free';
  }
}
