import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';
import { ContentService } from '../../services/content.services';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs';
import swal from 'sweetalert2'
import { LocalDataSource } from 'ng2-smart-table';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'ngx-news-event',
  styleUrls: ['./news-event.component.scss'],
  templateUrl: './news-event.component.html',
})
export class NewsEventComponent {
  
  public title: string="";
  onEditStatus: boolean = false;
  onDetail: boolean = false;
  public description = "";
  private folders = "blog/";
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
      pictureBanner: {
        title: 'Image',
        type: 'html',
        valuePrepareFunction: (img) => { return `${img} (<a target="_blank" href="${environment.imagesPath}${img}">View</a>)` }
      },
    },
    mode: "external"
  };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(private service:ContentService){
    this.loadTable();
  }
  
  loadTable(){
    const data = this.service.getAllNews().subscribe(res => {
      this.source.load(res);
    });
  }
  onEdit(event){
    this.title = event.data.title;
    this.description = event.data.description;
    this.onEditStatus = true;
    this.onDetail = true;
    this.dataId = event.data.id;
  }
  onAdd(){
    this.title = "";
    this.description = "";
    this.onEditStatus = false;
    this.onDetail = true;
  }
  dataId:any;
  update(){
    var file:any = (<HTMLInputElement>document.getElementById("imageFile"));
    this.service.updateNewsEvent({
      files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
      newsEventDetail: {
        id: this.dataId,
        title: this.title,
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
    this.service.addNewsEvent({
      files : file.files,//(<HTMLInputElement>document.getElementById("imageFile")),
      newsEventDetail: {
        title: this.title,
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
      this.service.deleteNewsEvent(event.data.id).subscribe(res => {
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
