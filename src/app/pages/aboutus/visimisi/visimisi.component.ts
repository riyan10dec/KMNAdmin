import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';
import { ContentService } from '../../../services/content.services';
import { GuidConst } from '../../guid-const';
declare var CKEDITOR: any;
import swal from 'sweetalert2'
@Component({
  selector: 'ngx-visimisi',
  templateUrl: './visimisi.component.html',
})
export class VisiMisiComponent {
  public visi;
  public visiID;
  public misi;
  public misiID;
  constructor(private service:ContentService){
    this.loadVisiMisi();
  }

  loadVisiMisi(){
    const data = this.service.getContentDetails(GuidConst.visimisi).subscribe(res => {
      for(var i = 0 ; i < res.length ; i++){
        if(res[i].title == "Misi"){
          this.misi = res[i].description;
          this.misiID = res[i].id;
        } else {
          this.visi = res[i].description;
          this.visiID = res[i].id;
        }
      }
    });
  }
  public update(){
    this.service.updateContent({
    contentDetail: {
      id: this.visiID,
      description: this.visi,
    }
  }).then( res => {
    this.service.updateContent({
      contentDetail: {
        id: this.misiID,
        description: this.misi,
      }
    }).then(res =>{
      swal({
        type: 'success',
        title: 'Save Success',
        showConfirmButton: false,
        timer: 1500
      })
    });
  });
  }
}
