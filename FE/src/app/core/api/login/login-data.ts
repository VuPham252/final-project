import { Observable } from "rxjs";
import { Login } from "../../model/login";

export abstract class LoginData {
  abstract login(data: Login): Observable<any>;
}
