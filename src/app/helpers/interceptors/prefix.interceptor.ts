import { UserModel } from './../../models/user.model';
import { AuthenticationService } from './../services/authentication.service';
import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { environment } from 'src/environments/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class PrefixInterceptor implements HttpInterceptor {
  user: UserModel = {} as UserModel;

  constructor(
    protected authenticationService: AuthenticationService,
    private loaderService: LoaderService
  ) {
    this.loaderService.setLoading(true);
    this.authenticationService.getUserInfo().subscribe((loggedUser) => {
      this.user = loggedUser as UserModel;
    });
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log("api-prefix interceptor", request.url, this.loggedUser);

    // if (!/^(http|https):/i.test(request.url)) {
    //   request = request.clone({ url: environment.serverUrl + request.url });
    // }
    console.log(request.headers, request.body);
    let body = { ...request.body };
    let cloned = request;
    if (
      request.headers.has('accept') &&
      request.headers.get('accept')?.startsWith('multipart/form-data')
    ) {
      console.log(body);
      let cloned = request.clone({
        // headers: request.headers
        //   .set("Authorization", "Bearer " + idToken)
        //   .set("access-token", idToken)
        //   // .set('content-type', 'application/json')
        //   .set("x-api-key", environment.apikey),
        // withCredentials: true,
        body: this.appendUserInfo(request.body, this.user),
      });
      console.log(cloned.body);
      return next
        .handle(cloned)
        .pipe(finalize(() => this.loaderService.setLoading(false)));
    } else {
      if (this.user) {
        body = {
          ...request.body,
          userInfo: this.user,
        };
      }

      let cloned = request.clone({
        // headers: request.headers
        //   .set("Authorization", "Bearer " + idToken)
        //   .set("access-token", idToken)
        //   // .set('content-type', 'application/json')
        //   .set("x-api-key", environment.apikey),
        // withCredentials: true,
        body,
      });
      return next
        .handle(cloned)
        .pipe(finalize(() => this.loaderService.setLoading(false)));
    }
  }

  private appendUserInfo(formData: FormData, user: any): FormData {
    // Create a new FormData instance
    const modifiedFormData = new FormData();

    // Append existing form data fields to the new FormData instance
    for (const key of formData.keys()) {
      modifiedFormData.append(key, formData.get(key) || '');
    }

    // Append user information as additional fields in the FormData
    modifiedFormData.append('userId', user.id);
    // modifiedFormData.append('userName', user.name);

    return modifiedFormData;
  }
}

export function PrefixInterceptorFn(
  request: HttpRequest<any>,
  next: HttpHandlerFn
) {
  let body = { ...request.body };
  const loaderService = inject(LoaderService);
  loaderService.setLoading(true);

  const authService = inject(AuthenticationService);
  authService.getUserInfo().subscribe({
    next: (user) => {
      console.log(user);
      if (user) {
        if (user) {
          body = {
            ...request.body,
            userInfo: user,
          };
        }
      }
      const clonedRequest = request.clone({
        // headers: request.headers
        //   .set("Authorization", "Bearer " + idToken)
        //   .set("access-token", idToken)
        //   // .set('content-type', 'application/json')
        //   .set("x-api-key", environment.apikey),
        // withCredentials: true,
        body,
      });
      return next(clonedRequest).pipe(
        finalize(() => loaderService.setLoading(false))
      );
    },
    error: (err) => {
      return next(request).pipe(
        finalize(() => loaderService.setLoading(false))
      );
    },
  });
}
