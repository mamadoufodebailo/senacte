import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {DomSanitizer} from '@angular/platform-browser';
import { ApiRepositoryService } from '../repository/api-repository.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { VideoModel } from '../models/video.model';
import {LienModel} from '../models/Lien.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  logo: string;
  page: number= 1;
  totalPages: number;
  donnees: any;
  videos: any;
  lien : LienModel = new LienModel();

  constructor(private domSanitize: DomSanitizer,private storage: Storage,
    private apiRepository: ApiRepositoryService,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.onLoad();
    let loading = await this.loadingCtrl.create({
      message : 'Chargement des données !'
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
    this.apiRepository.getVideo(this.page).subscribe(data => {
      this.donnees = data;
      this.totalPages = Math.ceil(this.donnees.meta.total / this.donnees.meta.per_page);

      this.videos = this.donnees.data.map(d => {
        let video = new VideoModel();

        video.id = d.id;
        video.titre = d.titre;
        video.url = d.url;

        return video;
      });

      this.storage.set('videos',this.videos);
    },error => {
      this.storage.get('videos').then(data => {
        this.donnees = data;
        
        this.videos = this.donnees.data.map(d => {
          let video = new VideoModel();

          video.id = d.id;
          video.titre = d.titre;
          video.url = d.url;

          return video;
        });

      }, error => {
        console.log('Aucun données recus !');
      })
    });
  }

  doInfinite(event){
    if (this.page <= this.totalPages){
      ++this.page;
      this.onSearch();
      event.complete();
    }
  }

  afficherVideo(url:string){
    return this.domSanitize.bypassSecurityTrustResourceUrl(url);
  }

}
