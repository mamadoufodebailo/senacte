import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {AlertController} from '@ionic/angular';
import { ApiRepositoryService } from '../repository/api-repository.service';
import { Storage } from '@ionic/storage';
import { ServiceModel } from '../models/service.model';
import { AlerteModel } from '../models/alerte.model';
import { RegionModel } from '../models/region.model';
import { IonicSelectableComponent } from 'ionic-selectable';
import {LienModel} from '../models/Lien.model';

@Component({
  selector: 'app-alerter',
  templateUrl: './alerter.page.html',
  styleUrls: ['./alerter.page.scss'],
})
export class AlerterPage implements OnInit {
  fgroup: FormGroup;
  message: any;
  photos = ['assets/images/photo.jpg','assets/images/photo.jpg'];
  donnees: any;
  services: any;
  alertes: any;
  regions: any;
  departements: any;
  alerte: AlerteModel = new AlerteModel();
  lien: LienModel = new LienModel();

  constructor(private fb: FormBuilder,private alertCtrl: AlertController,private camera: Camera,
    private apiRepository: ApiRepositoryService,private storage: Storage) {
    this.fgroup = this.fb.group({
       'type': [null,Validators.required],
       'service': [null,Validators.required],
        'message': [null,Validators.required],
       'region': [null,Validators.required],
       'departement': [null,Validators.required],
       'commune': [null,Validators.required]
    });
  }

  async ngOnInit() {
      this.onLoad();
      this.onSearch();
  }

  deletePhoto(niveau:string){
      if (niveau == 'premier'){
          if (this.photos[0] !== 'assets/images/photo.jpg'){
              this.photos[0] = 'assets/images/photo.jpg';
          }
      }
      else if (niveau == 'deuxieme'){
          if (this.photos[1] !== 'assets/images/photo.jpg'){
              this.photos[1] = 'assets/images/photo.jpg';
          }
      }
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
      this.apiRepository.getAlerter().subscribe(data => {
          this.donnees = data;

          this.alertes = this.donnees.data.map(d => {
              let alerter = new AlerteModel();
              alerter.id = d.id;
              alerter.type = d.type;

              return alerter;
          });

          this.storage.set('alertes', this.alertes);
      },error => {
          this.storage.get('alertes').then(data => {
              this.donnees = data;

              this.alertes = this.donnees.data.map(d => {
                  let alerter = new AlerteModel();
                  alerter.id = d.id;
                  alerter.type = d.type;

                  return alerter;
              });
          });
      });

      this.apiRepository.getService().subscribe(data => {
          this.donnees = data;

          this.services = this.donnees.data.map(d => {
              let service = new ServiceModel();
              service.id = d.id;
              service.nom = d.nom;

              return service;
          });

          this.storage.set('services',this.services);
      },error => {
          this.storage.get('services').then(data => {
              this.donnees = data;

              this.services = this.donnees.data.map(d => {
                  let service = new ServiceModel();
                  service.id = d.id;
                  service.nom = d.nom;

                  return service;
              });
          });
      });

      this.apiRepository.getRegion().subscribe(data => {
          this.donnees = data;

          this.regions = this.donnees.data.map(d => {
              let region = new RegionModel();

              region.id = d.id;
              region.nom = d.nom;
              region.departements = d.departements;

              return region;
          });

          this.storage.set('regions',this.regions);
      },error => {
          this.storage.get('regions').then(data => {
              this.donnees = data;

              this.regions = this.donnees.data.map(d => {
                  let region = new RegionModel();

                  region.id = d.id;
                  region.nom = d.nom;
                  region.departements = d.departements;

                  return region;
              });
          });
      });
  }

  onSelect(value:string){
      this.storage.get('regions').then(data => {
          this.donnees = data;
          for (let i = 0; i < this.donnees.length; i++) {
              if (this.donnees[i].nom == value) {
                  this.departements = this.donnees[i].departements;
                  document.getElementById("departement").style.display = "block";
              }
          }
      });
  }

  choixSource(options:any){
      this.camera.getPicture(options).then(data => {
         if (this.photos.length < 3){
             if (this.photos[0] == 'assets/images/photo.jpg'){
                this.photos[0] = 'data:image/png;base64,'+data;
             }
             else if (this.photos[1] == 'assets/images/photo.jpg'){
                 this.photos[1] = 'data:image/png;base64,'+data;
             }
         }
      });
  }

  async openPhoto(){
      const optionGalerie: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          targetWidth: 255,
          targetHeight: 255
      };

      const optionCamera : CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.CAMERA,
          targetHeight: 255,
          targetWidth: 255
      };

      const alert = await this.alertCtrl.create({
          header: 'Camera',
          message: 'Veuillez choisir votre source',
          buttons: [
              {
                  text: 'Camera',
                  handler: () => this.choixSource(optionCamera)
              },
              {
                  text: 'Galérie',
                  handler: () => this.choixSource(optionGalerie)
              }]
      });

      await alert.present();
  }

  async takeGalerie(){
      const optionGalerie: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          targetWidth: 255,
          targetHeight: 255
      };

      this.choixSource(optionGalerie);
  }

  async takePhoto(){
      const optionCamera : CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.CAMERA,
          targetHeight: 255,
          targetWidth: 255
      };
      
      this.choixSource(optionCamera);
  }

  initialiser(){
      this.fgroup.controls['message'].setValue("");
      this.fgroup.controls['commune'].setValue("");
      this.photos[0] = 'assets/images/photo.jpg';
      this.photos[1] = 'assets/images/photo.jpg';
  }

  onAlerter(alerter){
      this.alerte.type = alerter.type;
      this.alerte.region = alerter.region;
      this.alerte.departement = alerter.departement;
      this.alerte.service = alerter.service;
      this.alerte.message = alerter.message;
      this.alerte.commune = alerter.commune;

      if (this.photos[0] == 'assets/images/photo.jpg'){
          this.photos[0] = '';
      }

      if (this.photos[1] == 'assets/images/photo.jpg'){
          this.photos[1] = '';
      }

      this.alerte.photos = this.photos;

      this.apiRepository.saveAlerter(this.alerte).subscribe(data => {
          this.donnees = data;
          this.message = this.donnees.message;
          this.initialiser();
      }, error => {
          this.message = error;
      });
  }

}
