import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../model/room';
import { RoomData } from './room-data';
import { RoomApi } from './room.api';

@Injectable()
export class RoomService implements RoomData {

  constructor(private api: RoomApi) { }

  search(): Observable<any> {
    return this.api.search();
  }

  save(data: Room): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: Room): Observable<any> {
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
