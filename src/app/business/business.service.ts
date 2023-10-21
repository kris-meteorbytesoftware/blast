import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BusinessModel } from '../models/business.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(private http: HttpClient) {}

  myBusiness(): Observable<BusinessModel[]> {
    return this.http.post<any>(environment.url + '/business/myBusinesses', {});
  }

  createBusiness(business: BusinessModel): Observable<any> {
    return this.http.post<any>(environment.url + '/business/create', {
      business,
    });
  }
}
