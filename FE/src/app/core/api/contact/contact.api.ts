import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { Contact } from '../../model/contact';

@Injectable()
export class ContactApi {

  private readonly apiController: string = 'contact/send';

  constructor(private http: HttpService) { }

  post(data: Contact): Observable<any> {
    return this.http.post(this.apiController, data);
  }

}
