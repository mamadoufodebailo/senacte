import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {ModalController, LoadingController} from '@ionic/angular';
import {CommuniqueDetailPage} from '../communique-detail/communique-detail.page';
import { Storage } from '@ionic/storage';
import { ApiRepositoryService } from '../repository/api-repository.service';
import { CommuniqueModel } from '../models/communique.model';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import {LienModel} from '../models/Lien.model';

@Component({
  selector: 'app-communique',
  templateUrl: './communique.page.html',
  styleUrls: ['./communique.page.scss'],
})
export class CommuniquePage implements OnInit {
  logo:string;
  communiques: any;
  page: number= 1;
  totalPages: number;
  donnees: any;
  lien: LienModel = new LienModel();

  constructor(private modalCtrl: ModalController,private storage: Storage,
    private loadingCtrl: LoadingController,
    private apiRepository: ApiRepositoryService,
    private documentViewer: DocumentViewer) { }

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
      this.apiRepository.getCommunique(this.page).subscribe(data => {
          this.donnees = data;
          this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);
        
          this.communiques = this.donnees.data.map(d => {
              let communique = new CommuniqueModel();

              communique.id = d.id;
              communique.nom = d.nom;
              communique.contenu = d.contenu;
              communique.fichier = d.fichier;
              communique.photos = d.photos;
              communique.videos = d.videos;

              return communique;
          });

          this.storage.set('communiques',this.communiques);
      },error => {
          this.storage.get('communiques').then(data => {
              this.donnees = data;

              this.communiques = this.donnees.map(d => {
                  let communique = new CommuniqueModel();

                  communique.id = d.id;
                  communique.contenu = d.contenu;
                  communique.nom = d.nom;
                  communique.fichier = d.fichier;
                  communique.photos = d.photos;
                  communique.videos = d.videos;

                  return communique;
              });

          },error => {
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
  
  openPDF(id: string){
      this.storage.get('communiques').then(data => {
          this.donnees = data;
          this.donnees.forEach(d => {
              if (d.id = id){
                  const options : DocumentViewerOptions = {
                      title: d.nom
                  }
                  
                  this.documentViewer.viewDocument(d.fichier,'application/pdf',options);
              }
            });
        });
    }

  async openCommunique(communique: any){
      const modal = await this.modalCtrl.create({
         component: CommuniqueDetailPage,
         componentProps: {
             data: communique
         }
      });

      modal.present();
  }

}
