import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckOutData } from './check-out-data';
import { CheckOutApi } from './check-out.api';
import { CheckOut } from '../../model/checkOut';

@Injectable()
export class CheckOutService implements CheckOutData {

  constructor(private api: CheckOutApi) { }

  checkOut(data: CheckOut): Observable<any> {
    return this.api.checkOut(data);
  }

}
