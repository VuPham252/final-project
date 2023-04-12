import { Observable } from "rxjs";
import { Room } from '../../model/room';

export abstract class RoomData {
  abstract search(): Observable<any>;
  abstract save(data: Room): Observable<any>;
  abstract update(id:number, data: Room): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
