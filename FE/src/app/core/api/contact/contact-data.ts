import { Observable } from "rxjs";
import { Contact } from "../../model/contact";

export abstract class ContactData {
  abstract post(data: Contact): Observable<any>;
}
