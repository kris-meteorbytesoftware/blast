import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterBusinessComponent } from '../business/register-business/register-business.component';
import { BusinessComponent } from './business.component';
import { PurchaseLandmineComponent } from './purchase/purchase-landmine/purchase-landmine.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
  },
  {
    path: 'register',
    component: RegisterBusinessComponent,
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
  },
  {
    path: 'purchase/landmine',
    component: PurchaseLandmineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
