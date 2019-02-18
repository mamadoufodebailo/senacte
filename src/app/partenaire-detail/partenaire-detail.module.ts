import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PartenaireDetailPage } from './partenaire-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PartenaireDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PartenaireDetailPage]
})
export class PartenaireDetailPageModule {}
