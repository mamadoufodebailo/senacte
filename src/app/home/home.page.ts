import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiRepositoryService} from '../repository/api-repository.service';
import {Storage} from '@ionic/storage';
import {ImageModel} from '../models/image.model';
import {LienModel} from '../models/Lien.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  galeries = [];
  donnees: any;
  lien = new LienModel();

  constructor(private router: Router,private apiRepository: ApiRepositoryService,
              private storage: Storage){
  }

  async ngOnInit(){
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
      this.apiRepository.getImage().subscribe(data => {
          this.donnees = data;
          this.galeries = this.donnees.data.map(d =>{
              let image = new ImageModel();

              image.titre = d.titre;
              image.url = d.url;

              return image;
          });

          this.storage.set('images',this.galeries);
      },error => {
          this.storage.get('images').then(data => {
              this.donnees = data;

              this.galeries = this.donnees.map(d =>{
                  let image = new ImageModel();

                  image.titre = d.titre;
                  image.url = d.url;

                  return image;
              });
          });
      });
  }

  openPage(page:string){
    switch (page){
        case 'alerter' : this.router.navigateByUrl('/alerter');
          break;
        case 'informer' : this.router.navigateByUrl('/informer');
          break;
        case 'sensibiliser' : this.router.navigateByUrl('/sensibiliser');
          break;
        case 'video' : this.router.navigateByUrl('/video');
          break;
        default: this.router.navigateByUrl("/home");
          break;
    }

  }

}
