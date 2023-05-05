import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckInData } from './check-in-data';
import { CheckInApi } from './check-in.api';
import { CheckIn } from '../../model/checkIn';

@Injectable()
export class CheckInService implements CheckInData {

  constructor(private api: CheckInApi) { }

  checkIn(data: CheckIn): Observable<any> {
    return this.api.checkIn(data);
  }

}
