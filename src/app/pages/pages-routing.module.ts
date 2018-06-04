import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AnnualComponent } from './annual/annual.component';
import { NewsEventComponent } from './news-event/news-event.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  }, {
    path: 'aboutus',
    loadChildren: './aboutus/aboutus.module#AboutUsModule',
  },{
    path: 'produk',
    loadChildren: './produk/produk.module#ProdukModule',
  },{
    path: 'footer',
    component: FooterComponent,
  },{
    path: 'annual',
    component: AnnualComponent,
  },{
    path: 'news-event',
    component: NewsEventComponent,
  },
   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
