import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactData } from './contact-data';
import { ContactApi } from './contact.api';
import { Contact } from '../../model/contact';

@Injectable()
export class ContactService implements ContactData {

  constructor(private api: ContactApi) { }

  post(data: Contact): Observable<any> {
    return this.api.post(data);
  }

}

