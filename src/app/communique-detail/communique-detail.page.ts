import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-communique-detail',
  templateUrl: './communique-detail.page.html',
  styleUrls: ['./communique-detail.page.scss'],
})
export class CommuniqueDetailPage implements OnInit {
  communique: any;

  constructor(private modalCtrl: ModalController,private navParams: NavParams) {
    this.communique = this.navParams.get('data');
  }

  ngOnInit() {
  }

  onClose(){
    this.modalCtrl.dismiss();
  }

}
