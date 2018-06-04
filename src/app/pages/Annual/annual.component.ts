import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';
import { ContentService } from '../../services/content.services';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs';

import swal from 'sweetalert2'
import { GuidConst } from '../guid-const';
import { environment } from '../../../environments/environment.prod';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'ngx-annual',
  styleUrls: ['./annual.component.scss'],
  templateUrl: './annual.component.html',
})
export class AnnualComponent {
  
  swalHtml: any = `
  Image : <input type="file" id="imageFile" class="swal2-input" accept="image/*">
  File : <input type="file" id="filepdf" class="swal2-input" accept="application/pdf">
  Sequence : <input id="sequence" class="swal2-input">
  Title: <input id="title" class="swal2-input">`;
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
      image: {
        title: 'Image',
        type: 'html',
        valuePrepareFunction: (img) => { return `${img} (<a target="_blank" href="${environment.imagesPath}${img}">View</a>)` }
      },
      title: {
        title: 'Title',
        type: 'text',
      },
      attachmentPath: {
        title: 'File',
        type: 'html',
        valuePrepareFunction: (img) => { return `${img} (<a target="_blank" href="${environment.imagesPath}${img}">View</a>)` }
      },
    },
    mode: "external"
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ContentService) {
    this.loadTable();
  }
  loadTable(){
    
    const data = this.service.getContentDetails(GuidConst.annual).subscribe(res => {
      this.source.load(res);
    });
  }
  private files;
  private sequence;
  onEdit(event): void{
    swal({
      title: 'Edit Annual Report',
      html: this.swalHtml,
      focusConfirm: false,
      allowOutsideClick: () => !swal.isLoading(),
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      onOpen: () =>{
        (<HTMLInputElement>document.getElementById("sequence")).value = event.data.sequence;
        (<HTMLInputElement>document.getElementById("title")).value = event.data.title;
      },
      preConfirm: ()=> {
        var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
        var file2: any= (<HTMLInputElement>document.getElementById("filepdf"));
        return this.service.updateContent({
          files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
          files2 : file2.files,
          contentDetail: {
            id: event.data.id,
            sequence : (<HTMLInputElement>document.getElementById("sequence")).value,
            title : (<HTMLInputElement>document.getElementById("title")).value,
          },
          path: 'laporan/'
        });
      },
    })
    .then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Edit Success',
          showConfirmButton: false,
          timer: 1500
        })
        this.loadTable();
      }
    });
  }
  
  onAdd(event): void{
    swal({
      title: 'Add Annual Report',
      html:this.swalHtml,
      focusConfirm: false,
      allowOutsideClick: () => !swal.isLoading(),
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      onOpen: () =>{
        (<HTMLInputElement>document.getElementById("sequence")).value = '';
        (<HTMLInputElement>document.getElementById("title")).value = '';
      },
      preConfirm: ()=> {
        var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
        var file2: any= (<HTMLInputElement>document.getElementById("filepdf"));
        return this.service.addContent({
          files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
          files2 : file2.files,
          contentDetail: {
            contentID: GuidConst.annual,
            sequence : (<HTMLInputElement>document.getElementById("sequence")).value,
            title : (<HTMLInputElement>document.getElementById("title")).value,
          },
          path: 'laporan/'
        });
      },
    })
    .then((result) => {
      if (result.value) {
        swal({
          type: 'success',
          title: 'Add Success',
          showConfirmButton: false,
          timer: 1500
        })
        this.loadTable();
      }
    });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteContent(event.data.id).subscribe(res => {
        this.loadTable();
        event.confirm.resolve();
      });
      
    } else {
      event.confirm.reject();
    }
  }
}
