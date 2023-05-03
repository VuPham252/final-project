import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderData } from './order-data';
import { OrderApi } from './order.api';

@Injectable()
export class OrderService implements OrderData {

  constructor(private api: OrderApi) { }

  search(phone?: number): Observable<any> {
    return this.api.search(phone);
  }

  getById(id: number): Observable<any> {
    return this.api.getById(id);
  }

}
