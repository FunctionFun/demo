import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'so-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  // 右箭头
  @Input() arrow = 'chevron-forward-outline';
  // 左图标
  @Input() icon = '';

  constructor() { }

  ngOnInit() {}

}
