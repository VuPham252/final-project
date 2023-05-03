import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';

@Injectable()
export class OrderApi {

  private readonly apiController: string = 'admin/orders';

  constructor(private http: HttpService) { }

  search(phone?: number): Observable<any> {
    if(phone == undefined) {
      return this.http.get(`${this.apiController}?phone=`);
    }
    else
      return this.http.get(`${this.apiController}?phone=${phone}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(this.apiController + '/' + id);
  }

}
