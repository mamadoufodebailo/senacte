import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiRepositoryService} from '../repository/api-repository.service';
import {NewsletterModel} from '../models/newsletter.model';
import {LienModel} from '../models/Lien.model';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.page.html',
  styleUrls: ['./newsletter.page.scss'],
})
export class NewsletterPage implements OnInit {
  logo: string;
  fgroup: FormGroup;
  newsletter : NewsletterModel = new NewsletterModel();
  message: any;
  donnees: any;
  lien : LienModel = new LienModel();

  constructor(private fb: FormBuilder,private repository: ApiRepositoryService,
              private storage: Storage) {
    this.fgroup = fb.group({
        'prenoms': [null,Validators.required],
        'nom': [null,Validators.required],
        'telephone': [null,Validators.compose([Validators.required,Validators.pattern('[0-9]{9}')])],
        'email': [null,Validators.compose([Validators.required,Validators.email])]
    });
  }

  ngOnInit() {
    this.onLoad();
  }

  onLoad(){
      this.repository.getLien().subscribe(data => {
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

  initialiser(){
      this.fgroup.controls['prenoms'].setValue("");
      this.fgroup.controls['nom'].setValue("");
      this.fgroup.controls['email'].setValue("");
      this.fgroup.controls['telephone'].setValue("");
  }

  onNews(newsletter){
      this.newsletter.nom = newsletter.nom;
      this.newsletter.prenoms = newsletter.prenoms;
      this.newsletter.email = newsletter.email;
      this.newsletter.telephone = newsletter.telephone;

      this.repository.saveNewsletter(this.newsletter).subscribe(data => {
          this.donnees = data;
          this.message = this.donnees.message;
          this.initialiser();
          },error => {
          this.message = error;
      });
  }

}
