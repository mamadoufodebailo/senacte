import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ContactModel } from '../models/contact.model';
import { ApiRepositoryService } from '../repository/api-repository.service';
import {LienModel} from '../models/Lien.model';
import {Storage} from '@ionic/storage';
import {TestModel} from '../models/test.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  logo: string;
  fgroup: FormGroup;
  contact: ContactModel = new ContactModel();
  message: any;
  donnees: any;
  lien: LienModel = new LienModel();

  constructor(private fb: FormBuilder,private storage: Storage,
    private apiRepository: ApiRepositoryService) {
    this.fgroup = this.fb.group({
       'prenoms' : [null,Validators.required],
       'nom': [null,Validators.required],
       'email': [null,Validators.compose([Validators.required,Validators.email])],
       'message': [null,Validators.required]
    });
  }

  ngOnInit() {
    this.onLoad();
  }

  getTest(){
      this.apiRepository.getTest().subscribe(data => {
         console.log(data);
      });
  }

  savetest(){
      let test = new TestModel();
      test.photos = ['data:image/png;base64,xspoudriyuteg',
          'data:image/png;base64,gtrddzafgbwbgfv'];

      this.apiRepository.saveTest(test).subscribe(data => {
          console.log(data);
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

  initialiser(){
      this.fgroup.controls['prenoms'].setValue("");
      this.fgroup.controls['nom'].setValue("");
      this.fgroup.controls['message'].setValue("");
      this.fgroup.controls['email'].setValue("");
  }

  onContact(value){
    this.contact.prenoms = value.prenoms;
    this.contact.nom = value.nom;
    this.contact.message = value.message;
    this.contact.email = value.email;

    this.apiRepository.saveContact(this.contact)
    .subscribe(data => {
        this.donnees = data;
        this.message = this.donnees.message;
        this.initialiser();
    }, error => {
      this.message = error;
    });
  }

}
