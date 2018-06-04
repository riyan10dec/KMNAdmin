import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { FooterModule } from './footer/footer.module';
import { AnnualModule } from './annual/annual.module';
import { NewsEventModule } from './news-event/news-event.module';
import { ProdukModule } from './produk/produk.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NewsEventModule,
    ProdukModule,
    FooterModule,
    AnnualModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
