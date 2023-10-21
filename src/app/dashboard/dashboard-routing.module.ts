import { ShellService } from './../shell/shell.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  ShellService.childRoutes([
    {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      component: DashboardPage,
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
