import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {environment} from '../environments/environment.prod';
import {ApiRepositoryService} from './repository/api-repository.service';
import {LienModel} from './models/Lien.model';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
      {
          title: 'Acceuil',
          url: '/home',
          photo: 'assets/icon/accueil.png'
      },
      {
          title: 'Alerter',
          url: '/alerter',
          photo: 'assets/icon/alerte.jpg'
      },
      {
          title: 'Informations',
          url: '/informer',
          photo: 'assets/icon/informer.jpg'
      },
      {
          title: 'Communiques',
          url: '/communique',
          photo: 'assets/icon/communique.png'
      },
      {
          title: 'Partenaires',
          url: '/partenaire',
          photo: 'assets/icon/partenaire.jpg'
      },
      {
          title: 'Newsletter',
          url: '/newsletter',
          photo: 'assets/icon/newsletter.png'
      },
      {
          title: 'Contact',
          url: '/contact',
          photo: 'assets/icon/contact.png'
      }
  ];
  donnees: any;
  lien: LienModel = new LienModel();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiRepository: ApiRepositoryService,
    private storage: Storage
  ) {
    this.initializeApp();
    this.onLoad();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
}
