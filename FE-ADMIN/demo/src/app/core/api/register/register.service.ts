import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterData } from './register-data';
import { RegisterApi } from './register.api';
import { Register } from '../../model/register';

@Injectable()
export class RegisterService implements RegisterData {

  constructor(private api: RegisterApi) { }

  save(data: Register): Observable<any> {
    return this.api.save(data);
  }

}
