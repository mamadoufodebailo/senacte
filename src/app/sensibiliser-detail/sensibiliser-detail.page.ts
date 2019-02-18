import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sensibiliser-detail',
  templateUrl: './sensibiliser-detail.page.html',
  styleUrls: ['./sensibiliser-detail.page.scss'],
})
export class SensibiliserDetailPage implements OnInit {
  sensibilise: any;

  constructor(private modalCtrl: ModalController,
    private navParams: NavParams,private domSanitize: DomSanitizer) { }

  ngOnInit() {
    this.sensibilise = this.navParams.get('data');
  }

  onClose(){
    this.modalCtrl.dismiss();
  }

  displayVideo(url:string){
    return this.domSanitize.bypassSecurityTrustResourceUrl(url);
  }

}
