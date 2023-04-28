import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { Contact } from '../../model/contact';

@Injectable()
export class ContactApi {
  private readonly apiController: string = 'admin/contact';

  constructor(private http: HttpService) { }

  search(): Observable<any> {
    return this.http.get(this.apiController + "/all");
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiController}` + "/" + id);
  }
}
