import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {DomSanitizer} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { ApiRepositoryService } from '../repository/api-repository.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { SensibiliseModel } from '../models/sensibilise.model';
import { totalmem } from 'os';
import { SensibiliserDetailPage } from '../sensibiliser-detail/sensibiliser-detail.page';
import {LienModel} from '../models/Lien.model';

@Component({
  selector: 'app-sensibiliser',
  templateUrl: './sensibiliser.page.html',
  styleUrls: ['./sensibiliser.page.scss'],
})
export class SensibiliserPage implements OnInit {
  logo: string;
  donnees: any;
  sensibilises: any;
  page: number = 1;
  totalPages: number;
  lien: LienModel = new LienModel();

  constructor(private domSanitize: DomSanitizer,private storage: Storage,
    private apiRepository: ApiRepositoryService,private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.onLoad();
    let loading = await this.loadingCtrl.create({
      message: 'Chargement des données !'
    });

    loading.present();
    this.onSearch();
    loading.dismiss();
  }

    onLoad(){
        this.apiRepository.getLien().subscribe(data => {
            this.donnees = data;

            this.lien.id = this.donnees.data.id;
            this.lien.adresse = this.donnees.data.adresse;
            this.lien.email = this.donnees.data.email;
            this.lien.libelle = this.donnees.data.libelle;
            this.lien.logo = this.donnees.data.logo;
            this.lien.telephone = this.donnees.data.telephone;

            this.storage.set('liens',this.lien);
        },error => {
            this.storage.get('liens').then(data => {
                this.donnees = data;

                this.lien.id = this.donnees.id;
                this.lien.adresse = this.donnees.adresse;
                this.lien.email = this.donnees.email;
                this.lien.libelle = this.donnees.libelle;
                this.lien.logo = this.donnees.logo;
                this.lien.telephone = this.donnees.telephone;
            });
        });
    }

  onSearch(){
    this.apiRepository.getSensibiliser(this.page).subscribe(data => {
      this.donnees = data;
      this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);

      this.sensibilises = this.donnees.data.map(d => {
        let sensibilise = new SensibiliseModel();

        sensibilise.id = d.id;
        sensibilise.contenu = d.contenu;
        sensibilise.titre = d.titre;
        sensibilise.video = d.video;
        sensibilise.photos = d.photos;
        sensibilise.videos = d.videos;

        return sensibilise;
      });

      this.storage.set('sensibilises',this.sensibilises);
    },error => {
      this.storage.get('sensibilises').then(data => {
        this.donnees = data;

        this.sensibilises = this.donnees.data.map(d => {
          let sensibilise = new SensibiliseModel();

          sensibilise.id = d.id;
          sensibilise.contenu = d.contenu;
          sensibilise.titre = d.titre;
          sensibilise.video = d.video;
          sensibilise.photos = d.photos;
          sensibilise.videos = d.videos;

          return sensibilise;
        });
      },er => {
        console.log('Aucun données recu !');
      });
    });
  }

  doInfinite(event){
    if (this.page <= this.totalPages){
      ++this.page;
      this.onSearch();
      event.complete();
    }
  }

  async onSensibiliseSuite(sensibilise:any){
    const modal = await this.modalCtrl.create({
      component: SensibiliserDetailPage,
      componentProps: {
        data: sensibilise
      }
    });

    modal.present();
  }

  afficherVideo(url:string){
    return this.domSanitize.bypassSecurityTrustResourceUrl(url);
  }

}
