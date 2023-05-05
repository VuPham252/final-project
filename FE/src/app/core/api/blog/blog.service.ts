import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogApi } from './blog.api';
import { Blog } from '../../model/blog';
import { BlogData } from './blog-data';

@Injectable()
export class BlogService implements BlogData {

  constructor(private api: BlogApi) { }

  search(): Observable<any> {
    return this.api.search();
  }

  save(data: Blog): Observable<any> {
    return this.api.save(data);
  }

  update(id:number, data: Blog): Observable<any> {
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
