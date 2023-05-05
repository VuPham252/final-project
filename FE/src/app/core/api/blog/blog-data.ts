import { Observable } from "rxjs";
import { Blog } from "../../model/blog";

export abstract class BlogData {
  abstract search(): Observable<any>;
  abstract save(data: Blog): Observable<any>;
  abstract update(id:number, data: Blog): Observable<any>;
  abstract getById(id: number): Observable<any>;
  abstract deleteById(id: number): Observable<any>;
  abstract deleteSelectedId(data: number[]): Observable<any>;
}
