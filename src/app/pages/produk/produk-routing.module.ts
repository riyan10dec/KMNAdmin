import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpananComponent } from './simpanan/simpanan.component';
import { PinjamanComponent } from './pinjaman/pinjaman.component';
import { ProdukComponent } from './produk.component';

const routes: Routes = [{
  path: '',
  component: ProdukComponent,
  children: [
  {
    path: 'pinjaman',
    component: PinjamanComponent,
  }, 
  {
    path: 'simpanan',
    component: SimpananComponent,
  }, 
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdukRoutingModule { }
