import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CommuniqueDetailPage } from './communique-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CommuniqueDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CommuniqueDetailPage]
})
export class CommuniqueDetailPageModule {}
