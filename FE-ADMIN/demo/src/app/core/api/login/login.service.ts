import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from './login-data';
import { LoginApi } from './login.api';
import { Login } from '../../model/login';

@Injectable()
export class LoginService implements LoginData {

  constructor(private api: LoginApi) { }

  login(data: Login): Observable<any> {
    return this.api.login(data);
  }

}
