import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
  },
  {
      path: 'home',
      loadChildren: './home/home.module#HomePageModule'
  },
  {
      path: 'alerter',
      loadChildren: './alerter/alerter.module#AlerterPageModule'
  },
  {
      path: 'informer',
      loadChildren: './informer/informer.module#InformerPageModule'
  },
  {
      path: 'sensibiliser',
      loadChildren: './sensibiliser/sensibiliser.module#SensibiliserPageModule'
  },
  {
      path: 'video',
      loadChildren: './video/video.module#VideoPageModule'
  },
  {
      path: 'communique',
      loadChildren: './communique/communique.module#CommuniquePageModule'
  },
  {
      path: 'partenaire',
      loadChildren: './partenaire/partenaire.module#PartenairePageModule'
  },
  {
      path: 'newsletter',
      loadChildren: './newsletter/newsletter.module#NewsletterPageModule'
  },
  {
      path: 'contact',
      loadChildren: './contact/contact.module#ContactPageModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
