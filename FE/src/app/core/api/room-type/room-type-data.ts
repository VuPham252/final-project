import { Observable } from "rxjs";
import { roomType } from '../../model/room-type';

export abstract class RoomTypeData {
  abstract search(): Observable<any>;
  abstract save(data: roomType): Observable<any>;
  abstract update(id:number, data: roomType): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
