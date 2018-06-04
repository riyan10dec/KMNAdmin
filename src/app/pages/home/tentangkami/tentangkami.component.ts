import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';
import { ContentService } from '../../../services/content.services';
import { GuidConst } from '../../guid-const';
declare var CKEDITOR: any;
import swal from 'sweetalert2'
@Component({
  selector: 'ngx-tentangkami',
  templateUrl: './tentangkami.component.html',
})
export class TentangKamiComponent {
  public tentangKami;
  public tentangKamiID;
  constructor(private service:ContentService){
    this.loadTentangKami();
  }

  loadTentangKami(){
    const data = this.service.getContentDetail(GuidConst.tentangkami).subscribe(res => {
      this.tentangKami = res.description;
      this.tentangKamiID = res.id;
    });
  }
  public update(){this.service.updateContent({
    contentDetail: {
      id: this.tentangKamiID,
      description: this.tentangKami,
    }
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
