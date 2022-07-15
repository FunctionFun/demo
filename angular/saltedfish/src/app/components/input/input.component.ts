import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'so-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  // 输入框类型
  @Input() type = 'text';

  constructor() { }

  ngOnInit() {}

}
