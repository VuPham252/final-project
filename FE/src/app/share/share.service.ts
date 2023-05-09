import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ShareService {
  private getRoomTypeId = new BehaviorSubject<any>(0);

  currentId = this.getRoomTypeId.asObservable();

  constructor() {}

  public sendRoomTypeId(id: number) {
    this.getRoomTypeId.next(id);
  }

  // public getValue(): Observable<any> {
  //   return this.getRoomTypeId.asObservable();
  // }
}
