import { VoucherProgressBarComponent } from './voucher-progress-bar/voucher-progress-bar.component';
import { VouchersComponent } from './vouchers.component';
import { SharedModule } from './../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { VouchersRoutingModule } from './vouchers-routing.module';

@NgModule({
  declarations: [VouchersComponent, VoucherProgressBarComponent],
  imports: [SharedModule, VouchersRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VouchersModule {}
