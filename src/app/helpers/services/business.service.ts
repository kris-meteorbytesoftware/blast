import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessModel } from 'src/app/models/business.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private businessSubject: BehaviorSubject<BusinessModel | null> =
    new BehaviorSubject<BusinessModel | null>(null);
  public business$: Observable<BusinessModel | null> =
    this.businessSubject.asObservable();

  constructor() {}

  setBusiness(business: BusinessModel) {
    this.businessSubject.next(business);
  }
}
