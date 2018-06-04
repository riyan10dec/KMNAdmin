import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ContentService } from '../../../services/content.services';

import swal from 'sweetalert2'
import { GuidConst } from '../../guid-const';
import { environment } from '../../../../environments/environment.prod';
@Component({
  selector: 'ngx-sliders',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
  templateUrl: './sliders.component.html',
})
export class SlidersComponent {
   
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
        type: 'text',
      },
      image: {
        title: 'Image',
        type: 'html',
        valuePrepareFunction: (img) => { return `${img} (<a target="_blank" href="${environment.imagesPath}${img}">View</a>)` }
      },
    },
    mode: "external"
  };

  source: LocalDataSource = new LocalDataSource();
  private swalHtml = ` 
  Image : <input type="file" id="imageFile" class="swal2-input" accept="image/*">
  Sequence : <input id="sequence" class="swal2-input">
  Title: <input id="title" class="swal2-input">
  Description: <textarea id="description"
    class="swal2-textarea"  style="display: flex;"></textarea>
  `;
  private folders = "sliders/";
  constructor(private service: ContentService) {
    this.loadTable();
    this.source.setSort([{ field: 'sequence', direction: 'asc' }]);
  }
  loadTable(){
    const data = this.service.getContentDetails(GuidConst.sliders).subscribe(res => {
      this.source.load(res);
    });
  }
  private files;
  private sequence;
  onEdit(event): void{
    swal({
      title: 'Edit Testimoni',
      html: this.swalHtml,
      focusConfirm: false,
      allowOutsideClick: () => !swal.isLoading(),
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      onOpen: () =>{
        (<HTMLInputElement>document.getElementById("title")).value = event.data.title;
        (<HTMLInputElement>document.getElementById("description")).value = event.data.description;
        (<HTMLInputElement>document.getElementById("sequence")).value = event.data.sequence;
      },
      preConfirm: ()=> {
        var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
        return this.service.updateContent({
          files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
          contentDetail: {
            id: event.data.id,
            title: (<HTMLInputElement>document.getElementById("title")).value,
            sequence : (<HTMLInputElement>document.getElementById("sequence")).value,
            description: (<HTMLInputElement>document.getElementById("description")).value,
          },
          path: this.folders
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
      title: 'Add Testimoni',
      html: this.swalHtml,
      focusConfirm: false,
      allowOutsideClick: () => !swal.isLoading(),
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: ()=> {
        var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
        return this.service.addContent({
          files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
          contentDetail: {
            contentID: GuidConst.sliders,
            title: (<HTMLInputElement>document.getElementById("title")).value,
            sequence : (<HTMLInputElement>document.getElementById("sequence")).value,
            description: (<HTMLInputElement>document.getElementById("description")).value
          },
          path: this.folders
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
