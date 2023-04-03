import { Observable } from "rxjs";
import { Register } from "../../model/register";

export abstract class RegisterData {
  abstract save(data: Register): Observable<any>;
}
