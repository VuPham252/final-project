import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { Room } from '../../model/room';

@Injectable()
export class RoomApi {

  private readonly apiController: string = 'room';

  constructor(private http: HttpService) { }

  search(): Observable<any> {
    // let params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get(this.apiController + '/rooms');
  }

  save(data: Room): Observable<any> {
    return this.http.post(this.apiController, data);
  }

  update(id: number, data: Room): Observable<any> {
    return this.http.put(`${this.apiController}` + "/" + id, data);
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.apiController + id);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.apiController}` + "/" + id);
  }

  deleteSelectedId(data: number[]): Observable<any> {
    return this.http.post(`${this.apiController}/deleteByListId`, data);
  }

}
