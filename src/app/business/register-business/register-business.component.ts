import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessModel } from 'src/app/models/business.model';
import { BusinessService } from '../business.service';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.scss'],
})
export class RegisterBusinessComponent implements OnInit {
  businessForm: FormGroup = new FormGroup({
    businessName: new FormControl('', Validators.required),
    website: new FormControl(''),
    address: new FormControl('', Validators.required),
    logo: new FormControl(''),
  });

  constructor(private businessService: BusinessService) {}

  ngOnInit() {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.businessForm.controls['logo'].setValue(file);
  }

  submitForm() {
    if (this.businessForm.valid) {
      // Prepare and send the data to your server
      const business: BusinessModel = this.businessForm.value;
      console.log(business);
      this.businessService.createBusiness(business).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {},
      });
    }
  }
}
