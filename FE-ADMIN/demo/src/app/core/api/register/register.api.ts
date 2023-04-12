import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { Register } from '../../model/register';

@Injectable()
export class RegisterApi {

  private readonly apiController: string = 'auth/signup';

  constructor(private http: HttpService) { }

  save(data: Register): Observable<any> {
    return this.http.post(this.apiController, data);
  }

}
