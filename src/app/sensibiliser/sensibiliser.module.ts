import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SensibiliserPage } from './sensibiliser.page';

const routes: Routes = [
  {
    path: '',
    component: SensibiliserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SensibiliserPage]
})
export class SensibiliserPageModule {}
