import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/helpers/services/authentication.service';
import { DatesService } from 'src/app/helpers/services/dates.service';
import { GeolocationService } from 'src/app/helpers/services/geolocation.service';
import { UserService } from 'src/app/helpers/services/user.service';
import { LandmineModel } from 'src/app/models/landmine.model';
import { UserModel } from 'src/app/models/user.model';

import { isBefore } from 'date-fns';
import { LandmineService } from 'src/app/helpers/services/landmine.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-landmine',
  templateUrl: './purchase-landmine.component.html',
  styleUrls: ['./purchase-landmine.component.scss'],
})
export class PurchaseLandmineComponent implements OnInit {
  form: FormGroup;
  position: any;
  userInfo: UserModel = {} as UserModel;
  minDate: string;
  maxDate: string;

  constructor(
    private formBuilder: FormBuilder,
    private geolocationService: GeolocationService,
    private authService: AuthenticationService,
    private dateService: DatesService,
    private landmineService: LandmineService,
    private router: Router
  ) {
    this.minDate = this.dateService.formatDate();
    this.maxDate = this.dateService.formatDate(this.dateService.addMonths(1));

    this.form = this.formBuilder.group({
      startDate: [this.minDate, [Validators.required, this.validateDate]],
      time: ['', Validators.required],
      distance: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((userInfo) => {
      this.userInfo = userInfo ? userInfo : ({} as UserModel);
      console.log(userInfo);
    });
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position: GeolocationPosition) => {
        this.form.controls['lat'].setValue(position.coords.latitude);
        this.form.controls['lng'].setValue(position.coords.longitude);
      },
      error: (error: GeolocationPositionError) => {
        console.error('Error getting location:', error.message);
      },
    });
  }

  validateDate(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    // if (isBefore(selectedDate, currentDate)) {
    //   return { invalidDate: true };
    // }

    // TODO maxdate is not readable
    // console.log('maxdate', this.maxDate);
    // const maxDate = new Date(this.maxDate);
    // if (isBefore(selectedDate, maxDate)) {
    //   return { dateExceedsLimit: true };
    // }

    return null;
  }

  submitForm() {
    if (this.form.valid) {
      const days = this.form.get('time')?.value;
      const distance = this.form.get('distance')?.value;
      const landmine: LandmineModel = this.form.value;
      const expiration = this.dateService.formatDate(
        this.dateService.add({ days })
      );
      landmine.expirationDate = expiration;
      landmine.businessId = this.userInfo.business.id;
      console.log(landmine);
      console.log('Selected Distance:', distance);
      this.landmineService.purchase(landmine).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/feed');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
