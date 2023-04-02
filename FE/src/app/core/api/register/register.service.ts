import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterData } from './register-data';
import { RegisterApi } from './register.api';
import { Register } from '../../model/register';

@Injectable()
export class RegisterService implements RegisterData {

  constructor(private api: RegisterApi) { }

  search(): Observable<any> {
    return this.api.search();
  }

  save(data: Register): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: Register): Observable<any> {
    return this.api.update(id, data);
  }

  getById(id: number): Observable<any> {
    return this.api.getById(id);
  }

  deleteById(id: number): Observable<any> {
    return this.api.deleteById(id);
  }

  deleteSelectedId(data: number[]): Observable<any> {
    return this.api.deleteSelectedId(data);
  }
}
