import { Observable } from "rxjs";

export abstract class OrderData {
  abstract search(phone?: number): Observable<any>;

  abstract getById(id: number): Observable<any>;
}
