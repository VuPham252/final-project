import { Observable } from "rxjs";

export abstract class UploadData {
  abstract save(data: any): Observable<any>;
}
