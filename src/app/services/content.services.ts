import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Component, Inject } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()

export class ContentService {
    private options:any;
    private formOptions:any;
    private baseUrl:string = `${environment.api}/`;
    constructor(private http: Http) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Authorization', 'Bearer '+localStorage.getItem('auth_app_token'));
        this.options = new RequestOptions({ headers: headers });
      
        let headers2 = new Headers();
        //headers2.append('Content-Type', 'multipart/form-data');
        headers2.append('Access-Control-Allow-Credentials', 'true');
        headers2.append('Authorization', 'Bearer '+localStorage.getItem('auth_app_token'));
        this.formOptions = new RequestOptions({ headers: headers2 });
    }
    public getContentDetails(id: any): Observable<any> {    
        return this.http
            .get(`${this.baseUrl}api/Content/Details/${id}`,this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    public getContentDetail(id: any): Observable<any> {
        return this.http
            .get(`${this.baseUrl}api/Content/Detail/${id}`,this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    public getAllNews(): Observable<any> {
        return this.http
            .get(`${this.baseUrl}api/Content/NewsEvent`,this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getNewsDetail(id: any): Observable<any> {
        return this.http
            .get(`${this.baseUrl}api/Content/News/${id}`,this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getConfig(configKey: any): Observable<any> {
        return this.http
            .get(`${this.baseUrl}api/Content/GetConfig/${configKey}`,this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    public saveConfig(key: any, value: any): Observable<any> {
        let formData = new FormData();
        formData.append('configKey', key);
        formData.append('configValue', value);
        return this.http
            .post(`${this.baseUrl}api/Content/EditConfig`
                ,formData
                ,this.formOptions)
            .map(this.extractData)
            .catch(this.handleError)
    }
    public updateContent(data: any): Promise<any> {
        let formData = new FormData();
        if (data.files && data.files.length > 0) { // a file was selected
            for (let i = 0; i < data.files.length; i++) {
                formData.append('Files', data.files[i]);
            }
        }
        if (data.files2 && data.files2.length > 0) { // a file2 was selected
            for (let i = 0; i < data.files2.length; i++) {
                formData.append('Files2', data.files2[i]);
            }
        }
        formData.append('contentDetail', JSON.stringify(data.contentDetail));
        formData.append('path', JSON.stringify(data.path));
        return this.http
            .post(`${this.baseUrl}api/Content/EditContent`
                ,formData
                ,this.formOptions)
            .map(this.extractData)
            .catch(this.handleError)
            .toPromise();
    }
    public addContent(data: any): Promise<any> {
        let formData = new FormData();
        if (data.files && data.files.length > 0) { // a file was selected
            for (let i = 0; i < data.files.length; i++) {
                formData.append('Files', data.files[i]);
            }
        }
        if (data.files2 && data.files2.length > 0) { // a file2 was selected
            for (let i = 0; i < data.files2.length; i++) {
                formData.append('Files2', data.files2[i]);
            }
        }
        formData.append('contentDetail', JSON.stringify(data.contentDetail));
        formData.append('path', JSON.stringify(data.path));
        return this.http
            .post(`${this.baseUrl}api/Content/AddContent`
                ,formData
                ,this.formOptions)
            .map(this.extractData)
            .catch(this.handleError)
            .toPromise();
    }
    
    public deleteContent(contentDetailID: any): Observable<any> {
        let formData = new FormData();
        formData.append('contentDetailID', contentDetailID);
        return this.http
        .post(`${this.baseUrl}api/Content/DeleteContent`
                ,formData
                ,this.formOptions)
            .map(this.extractData)
            .catch(this.handleError)
    }
    private extractData(res: any) {
        const body = res.json();
        return body || {};
    }
    
    public updateNewsEvent(data: any): Promise<any> {
        let formData = new FormData();
        if (data.files && data.files.length > 0) { // a file was selected
            for (let i = 0; i < data.files.length; i++) {
                formData.append('Files', data.files[i]);
            }
        }
        formData.append('newsEventDetail', JSON.stringify(data.newsEventDetail));
        formData.append('path', JSON.stringify(data.path));
        return this.http
            .post(`${this.baseUrl}api/Content/UpdateNews`
                ,formData
                ,this.formOptions)
            .map(this.extractData)
            .catch(this.handleError)
            .toPromise();
    }
    public addNewsEvent(data: any): Promise<any> {
        let formData = new FormData();
        if (data.files && data.files.length > 0) { // a file was selected
            for (let i = 0; i < data.files.length; i++) {
                formData.append('Files', data.files[i]);
            }
        }
        formData.append('newsEventDetail', JSON.stringify(data.newsEventDetail));
        formData.append('path', JSON.stringify(data.path));
        return this.http
            .post(`${this.baseUrl}api/Content/AddNews`
                ,formData
                ,this.formOptions)
            .map(this.extractData)
            .catch(this.handleError)
            .toPromise();
    }
    
    public deleteNewsEvent(NewsEventID: any): Observable<any> {
        let formData = new FormData();
        formData.append('newsEventID', NewsEventID);
        return this.http
        .post(`${this.baseUrl}api/Content/DeleteNews`
                ,formData
                ,this.formOptions)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private handleError(error: any) { return Observable.throw(error); }
}