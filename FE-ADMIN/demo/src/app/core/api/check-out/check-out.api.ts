import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { CheckOut } from '../../model/checkOut';

@Injectable()
export class CheckOutApi {

  private readonly apiController: string = 'admin/check-out';

  private readonly apiCancelController: string = 'admin/booking/cancel'

  constructor(private http: HttpService) { }

  checkOut(data: CheckOut): Observable<any> {
    return this.http.post(this.apiController, data);
  }

  Cancel(data: CheckOut): Observable<any> {
    return this.http.post(this.apiCancelController, data);
  }

}
