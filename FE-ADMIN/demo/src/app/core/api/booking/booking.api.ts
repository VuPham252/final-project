import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { Booking, checkAva } from '../../model/booking';

@Injectable()
export class BookingApi {

  private readonly apiController: string = 'booking';

  private readonly apiAdminController: string = 'admin/availableRooms';

  private readonly apiBookingCountController: string = 'admin/booking-count-by-month';

  private readonly apiIncomeController: string = 'admin/income-in-months';

  constructor(private http: HttpService) { }

  checkAva(data: checkAva): Observable<any> {
    return this.http.post(this.apiController + '/available-rooms', data);
  }

  booking(data: Booking): Observable<any> {
    return this.http.post(this.apiController + '/booking-rooms', data);
  }

  checkAvaAdmin(data: checkAva): Observable<any> {
    return this.http.post(this.apiAdminController, data);
  }

  bookingCount(data: any): Observable<any> {
    return this.http.get(`${this.apiBookingCountController}?year=${data}`);
  }

  income(data: any): Observable<any> {
    return this.http.get(`${this.apiIncomeController}?year=${data}`)
  }

}
