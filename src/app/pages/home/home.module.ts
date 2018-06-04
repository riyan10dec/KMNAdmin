import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';

import { SlidersComponent } from './sliders/sliders.component';
import { TentangKamiComponent } from './tentangkami/tentangkami.component';
//import { NasabahComponent } from './nasabah/nasabah.component';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ContentService } from '../../services/content.services';
import { SukuBungaComponent } from './sukubunga/sukubunga.component';

const components = [
  HomeComponent,
  SlidersComponent,
  TentangKamiComponent,
  SukuBungaComponent,
  GroupComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    HomeRoutingModule,
    Ng2SmartTableModule,
    CKEditorModule,
  ],
  declarations: [
    ...components
  ],
  providers: [
    ContentService
  ]
})
export class HomeModule { }