import { Observable } from "rxjs";
import { Booking, checkAva } from "../../model/booking";

export abstract class BookingData {
  abstract checkAva(data: checkAva): Observable<any>;

  abstract booking(data: Booking): Observable<any>;

  abstract checkAvaAdmin(data: checkAva): Observable<any>;
}
