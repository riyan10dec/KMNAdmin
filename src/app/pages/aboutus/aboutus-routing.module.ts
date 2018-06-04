import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KataPengantarComponent } from './katapengantar/katapengantar.component';
import { DasarHukumComponent } from './dasarhukum/dasarhukum.component';
import { VisiMisiComponent } from './visimisi/visimisi.component';
import { TeamComponent } from './team/team.component';
import { AboutUsComponent } from './aboutus.component';

const routes: Routes = [{
  path: '',
  component: AboutUsComponent,
  children: [{
    path: 'dasarhukum',
    component: DasarHukumComponent,
  }, 
  {
    path: 'visimisi',
    component: VisiMisiComponent,
  }, 
  {
    path: 'team',
    component: TeamComponent,
  }, 
  {
    path: 'katapengantar',
    component: KataPengantarComponent,
  }, 
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule { }
