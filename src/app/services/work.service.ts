import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  openSnackBar(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }

  constructor( private _http: HttpClient ) { }


  addWork(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/works', data);
  }

  updateWork(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/works/${id}`, data);
  }

  getWork(): Observable<any> {
    return this._http.get('http://localhost:3000/works');
  }

  deleteWork (id:number): Observable<any> {
    return this._http.delete(`http://localhost:3000/works/${id}`)
  }


}


