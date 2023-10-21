import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export function ErrorHandlerInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
) {
  return next(request).pipe(
    catchError((err) => {
      console.log('http error');
      console.log(err);
      const error = (err && err.error && err.error.message) || err.statusText;
      //   console.log(error);
      return throwError(() => new Error(error));
    })
  );
}
