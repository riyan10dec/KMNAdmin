import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ContentService } from '../../../services/content.services';

import swal from 'sweetalert2'
import { GuidConst } from '../../guid-const';
import { environment } from '../../../../environments/environment.prod';
@Component({
  selector: 'ngx-team',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
  templateUrl: './team.component.html',
})
export class TeamComponent {
  
  swalHtml: any = `
  Image : <input type="file" id="imageFile" class="swal2-input" accept="image/*">
  Sequence : <input id="sequence" class="swal2-input">
  Name: <input id="name" class="swal2-input">
  Department: <input id="title" class="swal2-input">
  Description <textarea id="description" class="swal2-textarea"  style="display: flex;"></textarea>`;
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
      name: {
        title: 'Name',
        type: 'text',
      },
      description: {
        title: 'Description',
        type: 'text',
      },
      title: {
        title: 'Department',
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

  constructor(private service: ContentService) {
    this.loadTable();
  }
  loadTable(){
    
    const data = this.service.getContentDetails(GuidConst.team).subscribe(res => {
      this.source.load(res);
      this.source.setSort([{ field: 'sequence', direction: 'asc' }]);
    });
  }
  private files;
  private sequence;
  onEdit(event): void{
    swal({
      title: 'Edit Team',
      html: this.swalHtml,
      focusConfirm: false,
      allowOutsideClick: () => !swal.isLoading(),
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      onOpen: () =>{
        (<HTMLInputElement>document.getElementById("description")).value = event.data.description;
        (<HTMLInputElement>document.getElementById("sequence")).value = event.data.sequence;
        (<HTMLInputElement>document.getElementById("title")).value = event.data.title;
        (<HTMLInputElement>document.getElementById("name")).value = event.data.name;
      },
      preConfirm: ()=> {
        var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
        return this.service.updateContent({
          files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
          contentDetail: {
            id: event.data.id,
            sequence : (<HTMLInputElement>document.getElementById("sequence")).value,
            title : (<HTMLInputElement>document.getElementById("title")).value,
            name : (<HTMLInputElement>document.getElementById("name")).value,
            description : (<HTMLInputElement>document.getElementById("description")).value,
          },
          path: 'team/'
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
      title: 'Add Team',
      html:this.swalHtml,
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
            contentID: GuidConst.team,
            sequence : (<HTMLInputElement>document.getElementById("sequence")).value,
            title : (<HTMLInputElement>document.getElementById("title")).value,
            name : (<HTMLInputElement>document.getElementById("name")).value,
            description : (<HTMLInputElement>document.getElementById("description")).value,
          },
          path: 'team/'
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
