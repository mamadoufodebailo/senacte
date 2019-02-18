import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {ModalController, LoadingController} from '@ionic/angular';
import {InformerDetailPage} from '../informer-detail/informer-detail.page';
import {InformationModel} from '../models/information.model';
import {ApiRepositoryService} from '../repository/api-repository.service';
import { Storage } from '@ionic/storage';
import {LienModel} from '../models/Lien.model';

@Component({
  selector: 'app-informer',
  templateUrl: './informer.page.html',
  styleUrls: ['./informer.page.scss'],
})
export class InformerPage implements OnInit {
  logo: string;
  page: number= 1;
  totalPages: number;
  informations;
  donnees: any;
  lien : LienModel = new LienModel();

  constructor(private modalCtrl: ModalController,
              private apiRepository: ApiRepositoryService,
              private storage: Storage,
              private loadingCtrl: LoadingController) {
  }

  async ngOnInit() {
    this.onLoad();

    let loading =  await this.loadingCtrl.create({
      message : 'Chargement des données'
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

  doInfinite(event){
    if (this.page < this.totalPages){
      ++this.page;
      this.onSearch();
      event.target.complete();
    }
  }

  onSearch(){
      this.apiRepository.getInformation(this.page).subscribe(
          data => {
            this.donnees = data;
            this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);
            
          this.informations = this.donnees.data.map(d => {
              let information = new InformationModel();
              
              information.id = d.id;
              information.photo = d.photo;
              information.titre = d.titre;
              information.photos = d.photos;
              information.videos = d.videos;
              information.contenu = d.contenu;

              return information;
            });

          this.storage.set('informations', this.informations);
          },
          error => {
            this.storage.get('informations').then(data => {
              this.donnees = data;

              this.informations = this.donnees.map(d => {
                let information = new InformationModel();

                information.id = d.id;
                information.photo = d.photo;
                information.titre = d.titre;
                information.photos = d.photos;
                information.videos = d.videos;
                information.contenu = d.contenu;

                return information;
              });
            },error => {
              console.log('Aucun donnée !');
            })
          })
  }

  async onInformationSuite(information:any){
    const modal = await this.modalCtrl.create({
        component: InformerDetailPage,
        componentProps: {
            data : information
        }
      });

    modal.present();
  }

}
