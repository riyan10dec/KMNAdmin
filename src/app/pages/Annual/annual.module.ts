import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AnnualComponent } from './annual.component';
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
    AnnualComponent,
  ],
  providers: [
    ContentService
  ]
})
export class AnnualModule { }