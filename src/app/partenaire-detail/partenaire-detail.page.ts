import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-partenaire-detail',
  templateUrl: './partenaire-detail.page.html',
  styleUrls: ['./partenaire-detail.page.scss'],
})
export class PartenaireDetailPage implements OnInit {
  partenaire: any;

  constructor(private modalCtrl: ModalController,private navParams: NavParams) {
    this.partenaire = this.navParams.get('data');
  }

  ngOnInit() {
  }

  onClose(){
    this.modalCtrl.dismiss();
  }

}
