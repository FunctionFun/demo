import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'so-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  todo = [];

  constructor(public altCtrl: AlertController, private navCtrl: NavController) { }

  ngOnInit() {}

  async addTodo($event) {
    $event.stopPropagation();
    const alert = await this.altCtrl.create({
      cssClass: 'my-custom-class',
      header: '添加待办',
      inputs: [
        {
          name: 'content',
          type: 'text',
          placeholder: '请输入待办内容'
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '确定',
          handler: (e) => {
            console.log('Confirm Ok', e.content);
            const item = {
              id: new Date().getTime(),
              content: e.content,
              status: false,
            };
            this.todo.push(item);
          }
        }
      ]
    });

    await alert.present();
  }

  goTodo() {
    this.navCtrl.navigateForward(`/todo`);
  }

}
