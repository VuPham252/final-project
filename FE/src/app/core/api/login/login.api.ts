import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/base/http.service';
import { Login } from '../../model/login';

@Injectable()
export class LoginApi {

  private readonly apiController: string = 'auth/signin';

  constructor(private http: HttpService) { }

  login(data: Login): Observable<any> {
    return this.http.post(this.apiController, data);
  }

}
