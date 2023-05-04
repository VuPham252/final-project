import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { CheckIn } from '../../model/checkIn';

@Injectable()
export class CheckInApi {

  private readonly apiController: string = 'admin/check-in';

  constructor(private http: HttpService) { }

  checkIn(data: CheckIn): Observable<any> {
    return this.http.post(this.apiController, data);
  }

}
