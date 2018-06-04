import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { FooterComponent } from './footer.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ContentService } from '../../services/content.services';


@NgModule({
  imports: [
    ThemeModule,
    CKEditorModule,
  ],
  declarations: [
    FooterComponent,
  ],
  providers: [
    ContentService
  ]
})
export class FooterModule { }