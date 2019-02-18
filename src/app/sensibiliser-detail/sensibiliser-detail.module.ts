import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SensibiliserDetailPage } from './sensibiliser-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SensibiliserDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SensibiliserDetailPage]
})
export class SensibiliserDetailPageModule {}
