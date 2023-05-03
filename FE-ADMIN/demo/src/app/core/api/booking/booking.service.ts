import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingData } from './booking-data';
import { BookingApi } from './booking.api';
import { Booking, checkAva } from '../../model/booking';

@Injectable()
export class BookingService implements BookingData {

  constructor(private api: BookingApi) { }

  checkAva(data: checkAva): Observable<any> {
    return this.api.checkAva(data);
  }

  booking(data: Booking): Observable<any> {
    return this.api.booking(data);
  }

}
