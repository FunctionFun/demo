import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/** 业务服务API节点类 */
export class Api {
  constructor(private http: HttpService) {}

  /* - 用户模块 ---------------------------------------------------------- */

  // 登录
  login(userName: string, password: string) {
    return this.http.post(`/api/user/login`, {
      userName,
      password
    });
  }

  // 注册
  register(userName: string, password: string) {
    return this.http.post(`/api/user/register`, {
      userName,
      password
    });
  }

  // 根据ID获取用户信息
  getUserById(id: number) {
    return this.http.get(`/api/user/${id}`);
  }

  // 编辑用户信息
  editUserById(id: number, nickName: string) {
    return this.http.post(`/api/user/${id}`, {
      nickName
    });
  }

  /* - 工具模块 ---------------------------------------------------------- */
  // 获取今日天气
  getWeather(cityName: string) {
    return this.http.get(`/api/tool/weather/${cityName}`);
  }
}
