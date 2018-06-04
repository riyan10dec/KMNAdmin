import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';
import { ContentService } from '../../services/content.services';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs';
import swal from 'sweetalert2'
@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public fblink: string;
  public lilink: string;
  public email: string;
  public fax: string;
  public phone: string;
  public address: string;
  constructor(private service:ContentService){
    
    forkJoin([
      service.getConfig("OfficeAddress"),
      service.getConfig("OfficePhone"),
      service.getConfig("OfficeFax"),
      service.getConfig("OfficeEmail"),
      service.getConfig("SosialMediaLI"),
      service.getConfig("SosialMediaFB"),
  ]).subscribe(res => {
      this.address = res[0].configValue;
      this.phone = res[1].configValue;
      this.fax = res[2].configValue;
      this.email = res[3].configValue;
      this.lilink = res[4].configValue;
      this.fblink = res[5].configValue;
  });
  }
  update(){
    forkJoin([
      this.service.saveConfig("OfficeAddress", this.address),
      this.service.saveConfig("OfficePhone", this.phone),
      this.service.saveConfig("OfficeFax", this.fax),
      this.service.saveConfig("OfficeEmail", this.email),
      this.service.saveConfig("SosialMediaLI", this.lilink),
      this.service.saveConfig("SosialMediaFB", this.fblink),
    ]).subscribe(res => {
      swal({
        type: 'success',
        title: 'Save Success',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }
}
