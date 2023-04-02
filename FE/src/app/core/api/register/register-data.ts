import { Observable } from "rxjs";
import { Register } from "../../model/register";

export abstract class RegisterData {
  abstract search(): Observable<any>;
  abstract save(data: Register): Observable<any>;
  abstract update(id:number, data: Register): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
