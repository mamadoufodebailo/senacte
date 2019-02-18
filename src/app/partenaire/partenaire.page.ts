import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {ModalController} from '@ionic/angular';
import {PartenaireDetailPage} from '../partenaire-detail/partenaire-detail.page';
import { ApiRepositoryService } from '../repository/api-repository.service';
import { PartenaireModel } from '../models/partenaire.model';
import { Storage } from '@ionic/storage';
import {LienModel} from '../models/Lien.model';

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.page.html',
  styleUrls: ['./partenaire.page.scss'],
})
export class PartenairePage implements OnInit {
  logo: string;
  donnees: any;
  page: number = 1;
  partenaires: any;
  lien : LienModel = new LienModel();

  constructor(private modalCtrl: ModalController,private storage: Storage,
    private apiRepository: ApiRepositoryService) { }

  ngOnInit() {
    this.onLoad();
    this.onSearch();
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
      this.apiRepository.getPartenaire().subscribe(data => {
          this.donnees = data;

          this.partenaires = this.donnees.data.map(d => {
              let partenaire = new PartenaireModel();

              partenaire.id = d.id;
              partenaire.logo = d.logo;
              partenaire.description = d.description;
              partenaire.photos = d.photos;
              partenaire.videos = d.videos;

              return partenaire;
          });

          this.storage.set('partenaires',this.partenaires);
      },error => {
          this.storage.get('partenaires').then(data => {
              this.donnees = data;
              
              this.partenaires = this.donnees.data.map(d => {
                  let partenaire = new PartenaireModel();

                  partenaire.id = d.id;
                  partenaire.logo = d.logo;
                  partenaire.description = d.description;
                  partenaire.photos = d.photos;
                  partenaire.videos = d.videos;

                  return partenaire;
              });
          },error => {
              console.log('Aucun données recu !');
          })
      });
  }

  async openPartenaire(partenaire: any){
      const modal = await this.modalCtrl.create({
          component: PartenaireDetailPage,
          componentProps: {
              data: partenaire
          }
      });

      modal.present();
  }

}
