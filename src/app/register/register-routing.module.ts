import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';
import { RegisterBusinessComponent } from '../business/register-business/register-business.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
  },
  {
    path: 'business',
    component: RegisterBusinessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
