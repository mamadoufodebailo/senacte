import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiRepositoryService {

  constructor(private http: HttpClient) { }

  getInformation(page:number){
    return this.http.get(environment.API_URL+'/information?page='+page);
  }

  getCommunique(page:number){
    return this.http.get(environment.API_URL+'/communique?page='+page);
  }

  getRegion(){
    return this.http.get(environment.API_URL+'/region');
  }

  getLien(){
    return this.http.get(environment.API_URL+'/lien');
  }

  getService(){
    return this.http.get(environment.API_URL+'/service');
  }

  getAlerter(){
    return this.http.get(environment.API_URL+'/alerte');
  }

  getVideo(page:number){
    return this.http.get(environment.API_URL+'/video?page='+page);
  }

  getPartenaire(){
    return this.http.get(environment.API_URL+'/partenaire');
  }

  getImage(){
    return this.http.get(environment.API_URL+'/image');
  }

  getSensibiliser(page:number){
    return this.http.get(environment.API_URL+'/sensibiliser?page='+page);
  }

  saveAlerter(data:any){
    return this.http.post(environment.API_URL+'/alerte',JSON.stringify(data),
        {headers:new HttpHeaders({'Content-Type' : 'application/json'})}).pipe();
  }

  saveNewsletter(data:any){
    return this.http.post(environment.API_URL+'/newsletter',JSON.stringify(data),
        {headers:new HttpHeaders({'Content-Type' : 'application/json'})}).pipe();
  }

  saveContact(data:any){
    return this.http.post(environment.API_URL+'/contact',JSON.stringify(data),
        {headers:new HttpHeaders({'Content-Type' : 'application/json'})}).pipe();
  }

  getTest(){
    return this.http.get('http://localhost:8000/api/test');
  }

  saveTest(data:any){
    return this.http.post('http://localhost:8000/api/test',JSON.stringify(data),
        {headers: new HttpHeaders({'Content-Type' : 'application/json'})}).pipe();
  }

}
