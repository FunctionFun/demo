import { Injectable } from '@angular/core';
import { TipsService } from '../tips/tips.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { RuntimeService } from 'src/app/services/runtime/runtime.service';

const instance = axios.create({ timeout: 1000 * 12 });
instance.defaults.baseURL = environment.host;

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (!axios.isCancel(err)) {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.msg = '错误请求';
            break;
          case 401:
            // err.msg = noLogin ? '请重新登录' : '请登录';
            break;
          case 403:
            err.msg = '拒绝访问';
            break;
          case 404:
            err.msg = '请求错误,未找到该资源';
            break;
          case 405:
            err.msg = '请求方法未允许';
            break;
          case 408:
            err.msg = '请求超时';
            break;
          case 422: {
            const { data: { msg = '错误请求' } = {} } = err.response;
            err.msg = msg;
            break;
          }
          case 500:
            err.msg = '服务器端出错';
            break;
          case 501:
            err.msg = '网络未实现';
            break;
          case 502:
            err.msg = '网络错误';
            break;
          case 503:
            err.msg = '服务不可用';
            break;
          case 504:
            err.msg = '网络超时';
            break;
          case 505:
            err.msg = 'http版本不支持该请求';
            break;
          default:
            err.msg = `连接错误${err.response.status}`;
        }
      } else {
        err.msg = '网络不可用，请检查！';
      }
      console.log('err', err.msg);
    }
    return Promise.reject(err);
  }
);

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private tips: TipsService, private rs: RuntimeService) {}

  public get(path, params = {}) {
    return new Promise((resolve, reject) => {
      instance.get(path, { params }).then((res) => {
        if (!res.data.code) {
          resolve(res.data);
        } else {
          this.tips.alert(res.data.msg);
        }
      });
    });
  }

  public post(path, params = {}) {
    return new Promise((resolve, reject) => {
      instance.post(path, params).then((res) => {
        if (!res.data.code) {
          resolve(res.data);
        } else {
          this.tips.alert(res.data.msg);
        }
      });
    });
  }

  public delete(path, params = {}) {
    return new Promise((resolve, reject) => {
      instance.delete(path, { params }).then((res) => {
        if (!res.data.code) {
          resolve(res.data);
        } else {
          this.tips.alert(res.data.msg);
        }
      });
    });
  }

  public put(path, params = {}) {
    return new Promise((resolve, reject) => {
      instance.put(path, params).then((res) => {
        if (!res.data.code) {
          resolve(res.data);
        } else {
          this.tips.alert(res.data.msg);
        }
      });
    });
  }

  public patch(path, params = {}) {
    return new Promise((resolve, reject) => {
      instance.patch(path, params).then((res) => {
        if (!res.data.code) {
          resolve(res.data);
        } else {
          this.tips.alert(res.data.msg);
        }
      });
    });
  }
}
