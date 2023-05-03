import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadData } from './upload-data';
import { UploadApi } from './upload.api';

@Injectable()
export class UploadService implements UploadData {

  constructor(private api: UploadApi) { }

  save(data: any): Observable<any> {
    return this.api.save(data);
  }

}
