import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {


  constructor(private router: Router) { }

  // get loginUrl(): string {
  //   return environment.loginUrl;
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status === 401 && token == null) {
        alert('Bạn cần phải đăng nhập');
        this.router.navigate(['/login']);
      }
      if(error.status === 403) {
        alert("Bạn không có quyền để thực hiện hành động này");
        this.router.navigate(['/']);
      }
      return throwError(() => new Error(error.message));
    }));
  }
}
