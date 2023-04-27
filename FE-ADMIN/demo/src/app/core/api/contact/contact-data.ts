import { Observable } from "rxjs";
import { Contact } from '../../model/contact';

export abstract class ContactData {
  abstract search(): Observable<any>;
  abstract getById(id: number): Observable<any>;
}
