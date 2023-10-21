import { BusinessModel } from './../models/business.model';
import { Component, OnInit } from '@angular/core';
import { BusinessService } from './business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
})
export class BusinessComponent implements OnInit {
  businesses: BusinessModel[] = [] as BusinessModel[];
  constructor(private businessService: BusinessService) {}

  ngOnInit() {
    this.businessService.myBusiness().subscribe({
      next: (data) => {
        this.businesses = data;
      },
      error: (err) => {},
    });
  }
}
