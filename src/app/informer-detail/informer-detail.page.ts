import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-informer-detail',
  templateUrl: './informer-detail.page.html',
  styleUrls: ['./informer-detail.page.scss'],
})
export class InformerDetailPage implements OnInit {
  actualite: any;

  constructor(private modalCtrl: ModalController,private navParams: NavParams) { }

  ngOnInit() {
    this.actualite = this.navParams.get('data');
  }

  onClose(){
    this.modalCtrl.dismiss();
  }

}
