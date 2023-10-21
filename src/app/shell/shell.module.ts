import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [SharedModule],
})
export class ShellModule {}
