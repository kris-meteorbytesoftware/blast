import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormErrorsComponent } from '../shared/form-errors/form-errors.component';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { RegisterBusinessComponent } from './register-business/register-business.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseLandmineComponent } from './purchase/purchase-landmine/purchase-landmine.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BusinessRoutingModule,
    FormErrorsComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    BusinessComponent,
    RegisterBusinessComponent,
    PurchaseLandmineComponent,
    PurchaseComponent,
  ],
})
export class BusinessModule {}
