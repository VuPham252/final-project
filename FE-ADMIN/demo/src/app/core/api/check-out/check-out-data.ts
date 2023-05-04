import { Observable } from "rxjs";
import { CheckOut } from "../../model/checkOut";

export abstract class CheckOutData {
  abstract checkOut(data: CheckOut): Observable<any>;

  abstract Cancel(data: CheckOut): Observable<any>;
}
