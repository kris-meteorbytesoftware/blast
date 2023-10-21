import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<UserModel | null> =
    new BehaviorSubject<UserModel | null>(null);
  public user$: Observable<UserModel | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return of(!!this.userSubject.getValue()).pipe(tap((v) => console.log(v)));
  }

  isAuthenticated() {
    return !!this.userSubject.getValue();
  }

  saveUser(user: UserModel) {
    this.userSubject.next(user);
  }
  getUserInfo(): Observable<UserModel | null> {
    return this.user$;
  }

  login(userId: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(userId + ':' + password),
    });
    console.log(environment.url + '/authenticate');
    return this.http.post<any>(environment.url + '/authenticate', null, {
      headers,
    });
  }

  logout(): Observable<any> {
    this.userSubject.next(null);
    return this.http.post<any>(environment.url + '/logout', null);
  }
}
