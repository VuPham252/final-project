import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { Blog } from '../../model/blog';

@Injectable()
export class BlogApi {
  private readonly apiController: string = 'admin/blog';

  private readonly apiController1: string = 'blog/all';
  constructor(private http: HttpService) { }

  search(): Observable<any> {
    // let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get(this.apiController1);
  }

  save(data: Blog): Observable<any> {
    return this.http.post(this.apiController + "/save", data);
  }

  update(id: number, data: Blog): Observable<any> {
    return this.http.put(`${this.apiController}` + "/" + id, data);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiController1}` + "/" + id);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.apiController}` + "/" + id);
  }

  deleteSelectedId(data: number[]): Observable<any> {
    return this.http.post(`${this.apiController}/deleteByListId`, data);
  }
}
