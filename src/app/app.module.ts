import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {InformerDetailPageModule} from './informer-detail/informer-detail.module';
import {PartenaireDetailPageModule} from './partenaire-detail/partenaire-detail.module';
import {CommuniqueDetailPageModule} from './communique-detail/communique-detail.module';
import {Camera} from '@ionic-native/camera/ngx';
import {HttpClientModule} from '@angular/common/http';
import {ApiRepositoryService} from './repository/api-repository.service';
import {IonicStorageModule} from '@ionic/storage';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { SensibiliserDetailPageModule } from './sensibiliser-detail/sensibiliser-detail.module';
import {IonicSelectableModule} from 'ionic-selectable';
import {HTTP} from '@ionic-native/http/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
      InformerDetailPageModule,
      PartenaireDetailPageModule,
      CommuniqueDetailPageModule,
      SensibiliserDetailPageModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      IonicSelectableModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    ApiRepositoryService,
    DocumentViewer,
      HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
