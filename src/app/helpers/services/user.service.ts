import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  checkUsername(username: string) {
    const params = JSON.stringify({
      text: username,
    });

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-api-key', environment.keys.apikey);

    return this.http.post<any>(environment.url + '/checkusername', params, {
      headers,
    });
  }

  checkEmail(email: string) {
    const params = JSON.stringify({
      text: email,
    });

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-api-key', environment.keys.apikey);

    return this.http.post<any>(environment.url + '/checkemail', params, {
      headers,
    });
  }

  registerUser(user: UserModel, password: string) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(user.email + ':' + password),
    });

    return this.http.post<any>(
      environment.url + '/register',
      { register: user },
      {
        headers,
      }
    );
  }

  verifyCode(access: number, code: string) {
    const params = JSON.stringify({
      access,
      code,
    });

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-api-key', environment.keys.apikey);

    return this.http.post<any>(environment.url + '/verifyCode', params, {
      headers,
    });
  }

  saveLocation(lat: number, lng: number) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-api-key', environment.keys.apikey);

    return this.http.post<any>(
      environment.url + '/user/save-location',
      { lat, lng },
      {
        headers,
      }
    );
  }

  saveProfile(form: FormData): Observable<any> {
    const headers = new HttpHeaders({ Accept: 'multipart/form-data' });

    return this.http.post<any>(environment.url + '/user/profile/save', form, {
      headers,
    });
  }
}
