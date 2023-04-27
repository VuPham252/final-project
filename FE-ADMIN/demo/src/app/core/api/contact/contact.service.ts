import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactData } from './contact-data';
import { ContactApi } from './contact.api';

@Injectable()
export class ContactService implements ContactData {

  constructor(private api: ContactApi) { }

  getById(id: number): Observable<any> {
    return this.api.getById(id);
  }

  search(): Observable<any> {
    return this.api.search();
  }
}
