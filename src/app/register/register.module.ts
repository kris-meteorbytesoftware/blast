import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { FormErrorsComponent } from '../shared/form-errors/form-errors.component';
import { RegisterBusinessComponent } from '../business/register-business/register-business.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    FormErrorsComponent,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
