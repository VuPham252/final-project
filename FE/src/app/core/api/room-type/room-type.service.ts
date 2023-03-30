import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roomType } from '../../model/room-type';
import { RoomTypeData } from './room-type-data';
import { RoomTypeApi } from './room-type.api';

@Injectable()
export class RoomTypeService implements RoomTypeData {

  constructor(private api: RoomTypeApi) { }

  search(pageNumber: number, pageSize: number, txtSearch?: string): Observable<any> {
    return this.api.search(pageNumber, pageSize, txtSearch);
  }

  save(data: roomType): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: roomType): Observable<any> {
    return this.api.update(id, data);
  }

  getById(id: number): Observable<any> {
    return this.api.getById(id);
  }

  deleteById(id: number): Observable<any> {
    return this.api.deleteById(id);
  }

  deleteSelectedId(data: number[]): Observable<any> {
    return this.api.deleteSelectedId(data);
  }
}
