import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, Observable } from 'rxjs';
import { BlastModel } from 'src/app/models/blast.model';
import { BusinessModel } from 'src/app/models/business.model';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { LandmineModel } from 'src/app/models/landmine.model';

@Injectable({
  providedIn: 'root',
})
export class LandmineService {
  location: any;
  constructor(private http: HttpClient) {
    this.getLocation();
  }

  async getLocation() {
    this.location = await Geolocation.getCurrentPosition();
  }

  get(lat: number, lng: number): Observable<LandmineModel[]> {
    return this.http.post<any>(environment.url + '/landmine/get', {
      lat,
      lng,
    });
  }

  purchase(landmine: LandmineModel): Observable<any> {
    return this.http.post<any>(environment.url + '/landmine/purchase', {
      landmine,
    });
  }
}
