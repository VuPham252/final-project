import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';

@Injectable()
export class UploadApi {

  private readonly apiController: string = 'admin/uploadFiles';

  constructor(private http: HttpService) { }

  save(data: any): Observable<any> {
    return this.http.post(this.apiController, data);
  }

}
