import { Observable } from "rxjs";
import { CheckIn } from "../../model/checkIn";

export abstract class CheckInData {
  abstract checkIn(data: CheckIn): Observable<any>;
}
