import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShareService {

  public getUser: Subject<any> = new Subject<any>();

  constructor() { }
}
