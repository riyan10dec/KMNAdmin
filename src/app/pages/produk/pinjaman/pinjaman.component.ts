import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';
import { ContentService } from '../../../services/content.services';
import { GuidConst } from '../../guid-const';
declare var CKEDITOR: any;
import swal from 'sweetalert2'
import { LocalDataSource } from 'ng2-smart-table';
import { environment } from '../../../../environments/environment.prod';
@Component({
  selector: 'ngx-pinjaman',
  templateUrl: './pinjaman.component.html',
})
export class PinjamanComponent {
  sequence: any;
  // name: any;
  public title: string="";
  onEditStatus: boolean = false;
  onDetail: boolean = false;
  public description = "";
  private folders = "pinjaman/";
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      sequence: {
        title: 'Sequence',
        type: 'text',
      },
      title: {
        title: 'Title',
        type: 'text',
      },
      description: {
        title: 'Description',
        type: 'html',
        valuePrepareFunction: (d) => { 
          if(d.length > 100){
            return d.substring(0,100)+"...";
          }  
        return d;
        },
      },
      image: {
        title: 'Image',
        type: 'html',
        valuePrepareFunction: (img) => { return `${img} (<a target="_blank" href="${environment.imagesPath}${img}">View</a>)` }
      },
      // 3: {
      //   title: 'Icon',
      //   type: 'text',
      // },
    },
    mode: "external"
  };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(private service:ContentService){
    this.loadTable();
  }

  loadTable(){
    const data = this.service.getContentDetails(GuidConst.pinjaman).subscribe(res => {
      this.source.load(res);
      this.source.setSort([{ field: 'sequence', direction: 'asc' }]);
    });
  }
  onEdit(event){
    this.title = event.data.title;
    this.sequence = event.data.sequence;
    // this.name = event.data.name;
    this.description = event.data.description;
    this.onEditStatus = true;
    this.onDetail = true;
    this.dataId = event.data.id;
  }
  onAdd(){
    this.title = "";
    // this.name = "";
    this.sequence = "";
    this.description = "";
    this.onEditStatus = false;
    this.onDetail = true;
  }
  dataId:any;
  update(){
    var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
    this.service.updateContent({
      files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
      contentDetail: {
        id: this.dataId,
        title: this.title,
        sequence: this.sequence,
        // name: this.name,
        description: this.description,
      },
      path: this.folders
    }).then(x=>{
      this.onDetail = false;;
      this.loadTable();
      swal({
        type: 'success',
        title: 'Edit Success',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }
  
  add(){
    var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
    this.service.addContent({
      files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
      contentDetail: { 
        contentID: GuidConst.pinjaman,
        title: this.title,
        sequence: this.sequence,
        // name: this.name,
        description: this.description
      },
      path: this.folders
    }).then(x=>{
      this.onDetail = false;;
      this.loadTable();
      swal({
        type: 'success',
        title: 'Add Success',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteContent(event.data.id).subscribe(res => {
        swal({
          type: 'success',
          title: 'Delete Success',
          showConfirmButton: false,
          timer: 1500
        })
        this.loadTable();
        event.confirm.resolve();
      });
      
    } else {
      event.confirm.reject();
    }
  }

  back():void{
    this.onDetail = false;;
  }
}
