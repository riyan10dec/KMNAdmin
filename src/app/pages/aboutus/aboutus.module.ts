import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';

import { DasarHukumComponent } from './dasarhukum/dasarhukum.component';
import { KataPengantarComponent } from './katapengantar/katapengantar.component';
import { TeamComponent } from './team/team.component';
import { VisiMisiComponent } from './visimisi/visimisi.component';
import { AboutUsComponent } from './aboutus.component';
import { AboutUsRoutingModule } from './aboutus-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ContentService } from '../../services/content.services';

const components = [
  AboutUsComponent,
  VisiMisiComponent,
  TeamComponent,
  KataPengantarComponent,
  DasarHukumComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AboutUsRoutingModule,
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
export class AboutUsModule { }