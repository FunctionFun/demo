import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IndexPage } from './index.page';
import { ClockComponentModule } from 'src/app/components/clock/clock.module';
import { TodoComponentModule } from 'src/app/components/todo/todo.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: IndexPage }]),
    ClockComponentModule,
    TodoComponentModule
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {}
