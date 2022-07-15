import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-find',
  templateUrl: 'find.page.html',
  styleUrls: ['find.page.scss'],
})
export class FindPage {
  // 网址列表
  sites = [
    {
      category: '社交',
      list: [
        {
          title: '知乎',
          url: 'https://www.zhihu.com/',
        },
        {
          title: 'Bilibili',
          url: 'https://www.bilibili.com',
        },
        {
          title: '豆瓣',
          url: 'https://www.douban.com',
        },
      ],
    },
    {
      category: '编程',
      list: [
        {
          title: 'Github',
          url: 'https://github.com/',
        },
        {
          title: 'StackOverFlow',
          url: 'https://stackoverflow.com/',
        },
        {
          title: 'Github',
          url: 'https://github.com/',
        },
        {
          title: 'LeetCode',
          url: 'https://leetcode-cn.com/',
        },
      ],
    },
    {
      category: '设计',
      list: [
        {
          title: 'Dribbble',
          url: 'https://dribbble.com/',
        },
        {
          title: '花瓣',
          url: 'https://huaban.com/',
        },
        {
          title: '优设',
          url: 'https://dribbble.com/',
        },
        {
          title: '人人都是产品经理',
          url: 'http://www.woshipm.com/',
        },
      ],
    },
    {
      category: '游戏',
      list: [
        {
          title: '游研社',
          url: 'https://www.yystv.cn',
        },
        {
          title: 'IndieNova',
          url: 'https://indienova.com/',
        },
        {
          title: '独游网',
          url: 'http://www.indiegames.cn/',
        },
      ],
    },
    {
      category: '慕课',
      list: [
        {
          title: '学习强国',
          url: 'https://www.xuexi.cn/',
        },
        {
          title: '网易公开课',
          url: 'https://open.163.com/',
        },
        {
          title: '学堂在线',
          url: 'https://next.xuetangx.com/',
        },
        {
          title: 'TED演讲',
          url: 'https://www.ted.com/',
        },
      ],
    },
  ];
  // 搜索关键词
  searchKey = '';

  constructor(private iab: InAppBrowser) {}

  goToSite(item: any) {
    this.iab.create(item.url, '_blank', 'toolbarcolor=#28c3c0,navigationbuttoncolor=#ffffff,closebuttoncolor=#ffffff');
  }

  submitSearch(e: any) {
    e.preventDefault();
    const path = 'https://cn.bing.com/search?q=' + this.searchKey;
    this.iab.create(path, '_blank', 'toolbarcolor=#28c3c0,navigationbuttoncolor=#ffffff,closebuttoncolor=#ffffff');
  }
}
