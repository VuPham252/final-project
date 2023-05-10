import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingData } from './booking-data';
import { BookingApi } from './booking.api';
import { Booking, checkAva } from '../../model/booking';

@Injectable()
export class BookingService implements BookingData {

  constructor(private api: BookingApi) { }
  checkAvaAdmin(data: checkAva): Observable<any> {
    return this.api.checkAvaAdmin(data);
  }

  checkAva(data: checkAva): Observable<any> {
    return this.api.checkAva(data);
  }

  booking(data: Booking): Observable<any> {
    return this.api.booking(data);
  }

  bookingCount(data: any): Observable<any> {
    return this.api.bookingCount(data);
  }

  income(data: any): Observable<any> {
    return this.api.income(data);
  }

}
