import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, Observable } from 'rxjs';
import { BlastModel } from 'src/app/models/blast.model';
import { BusinessModel } from 'src/app/models/business.model';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class BlastService {
  location: any;
  constructor(private http: HttpClient) {
    this.getLocation();
  }

  async getLocation() {
    this.location = await Geolocation.getCurrentPosition();
  }

  fetchBlastFeed(lat: number, lng: number): Observable<BlastModel[]> {
    return this.http.post<any>(environment.url + '/blast/get', {
      lat,
      lng,
    });
  }

  myVouchers(): Observable<any[]> {
    return this.http.post<any>(environment.url + '/blast/my-vouchers', {});
  }

  async fetchLandMines(): Promise<Observable<BusinessModel[]>> {
    if (!this.location) {
      await this.getLocation();
    }

    const params = JSON.stringify({
      lat: this.location.coords.latitude,
      lng: this.location.coords.longitude,
    });
    console.log(params);
    return this.http.post<any>(environment.url + '/getLandMines', params);
  }

  newBlast(data: any, file?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('blastText', data.blastText);
    formData.append('lat', data.lat);
    formData.append('lng', data.lng);
    if (file) {
      formData.append('file', file);
    }
    let lat: number;
    let lng: number;
    let imageUrl: string;
    // if (business) {
    //   lat = business.lat;
    //   lng = business.lng;
    // } else {
    //   lat = this.location.coords.latitude;
    //   lng = this.location.coords.longitude;
    // }

    const headers = new HttpHeaders({
      Accept: 'multipart/form-data',
    });

    return this.http.post(environment.url + '/blast/create', formData, {
      headers,
    });
  }

  saveVoucher(blastId: number): Observable<any> {
    return this.http.post<any>(environment.url + '/blast/save-voucher', {
      blastId,
    });
  }

  scan(businessId: number): Observable<any> {
    return this.http.post<any>(environment.url + '/blast/scan', {
      businessId,
    });
  }
}
