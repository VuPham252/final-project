import { Observable } from "rxjs";
import { CheckOut } from "../../model/checkOut";

export abstract class CheckOutData {
  abstract checkOut(data: CheckOut): Observable<any>;
}
