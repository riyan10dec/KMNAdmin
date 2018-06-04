import { Component, OnInit } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';
import { ContentService } from '../../../services/content.services';
import { GuidConst } from '../../guid-const';
declare var CKEDITOR: any;
import swal from 'sweetalert2'
@Component({
  selector: 'ngx-sukubunga',
  templateUrl: './sukubunga.component.html',
})
export class SukuBungaComponent implements OnInit {
  public sukubunga:any ={};
  public sukubunga2:any={};
  public sukubunga3:any={};
  public sukubunga4:any={};
  constructor(private service:ContentService){
  }
ngOnInit(){
  this.loadSukuBunga();
}
  loadSukuBunga(){
    const data = this.service.getContentDetails(GuidConst.sukubunga).subscribe(res => {
      res.forEach(element => {
        switch (element.sequence) {
          case 1:
            this.sukubunga = element;
            break;
        
          case 2:
          this.sukubunga2 = element;
          break;
            
          case 3:
          this.sukubunga3 = element;
          break;
          
          case 4:
            this.sukubunga4 = element;
            break;

          default:
            break;
        }
      });
    });
  }
  public update(){
    this.updateDetail(this.sukubunga).then( res => {
      this.updateDetail(this.sukubunga2).then( res => {
        this.updateDetail(this.sukubunga3).then( res => { 
          this.updateDetail(this.sukubunga4).then( res => {

            swal({
              type: 'success',
              title: 'Save Success',
              showConfirmButton: false,
              timer: 1500
            });
          });
        });
      });
    });
  }
  private updateDetail(sbDetail: any): Promise<any>{
    return this.service.updateContent({
      contentDetail: {
        id: sbDetail.id,
        description: sbDetail.description,
      }
    })
  }
}
