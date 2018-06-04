import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CKEditorModule } from 'ng2-ckeditor';

import { SimpananComponent } from './simpanan/simpanan.component';
import { PinjamanComponent } from './pinjaman/pinjaman.component';
import { ProdukComponent } from './produk.component';
import { ProdukRoutingModule } from './produk-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ContentService } from '../../services/content.services';

const components = [
  ProdukComponent,
  PinjamanComponent,
  SimpananComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ProdukRoutingModule,
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
export class ProdukModule { }