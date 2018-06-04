import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';
import { ContentService } from '../../../services/content.services';
import { GuidConst } from '../../guid-const';
declare var CKEDITOR: any;
import swal from 'sweetalert2'
@Component({
  selector: 'ngx-katapengantar',
  templateUrl: './katapengantar.component.html',
})
export class KataPengantarComponent {
  public katapengantar;
  public katapengantarID;
  public image;
  constructor(private service:ContentService){
    this.loadKataPengantar();
  }

  loadKataPengantar(){
    const data = this.service.getContentDetail(GuidConst.katapengantar).subscribe(res => {
      this.katapengantar = res.description;
      this.katapengantarID = res.id;
    });
  }
  public update(){
    var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
    this.service.updateContent({
    files: file.files,
    contentDetail: {
      id: this.katapengantarID,
      description: this.katapengantar,
    },
    path: ''
  }).then( res => {
    swal({
      type: 'success',
      title: 'Save Success',
      showConfirmButton: false,
      timer: 1500
    })
  });
  }
}
