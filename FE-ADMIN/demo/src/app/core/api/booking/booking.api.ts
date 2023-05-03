import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { Booking, checkAva } from '../../model/booking';

@Injectable()
export class BookingApi {

  private readonly apiController: string = 'booking';

  constructor(private http: HttpService) { }

  checkAva(data: checkAva): Observable<any> {
    return this.http.post(this.apiController + '/available-rooms', data);
  }

  booking(data: Booking): Observable<any> {
    return this.http.post(this.apiController + '/booking-rooms', data);
  }

}
