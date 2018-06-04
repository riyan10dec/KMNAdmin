import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { NewsEventComponent } from './news-event.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ContentService } from '../../services/content.services';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    ThemeModule,
    CKEditorModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    NewsEventComponent,
  ],
  providers: [
    ContentService
  ]
})
export class NewsEventModule { }