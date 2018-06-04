import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupComponent } from './group/group.component';
import { SukuBungaComponent } from './sukubunga/sukubunga.component';
import { TentangKamiComponent } from './tentangkami/tentangkami.component';
import { SlidersComponent } from './sliders/sliders.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: 'sukubunga',
    component: SukuBungaComponent,
  }, 
  {
    path: 'tentangkami',
    component: TentangKamiComponent,
  }, 
  {
    path: 'sliders',
    component: SlidersComponent,
  }, 
  {
    path: 'group',
    component: GroupComponent,
  }, 
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
