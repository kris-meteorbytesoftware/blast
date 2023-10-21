import { LandmineComponent } from './landmine/landmine.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShellService } from './shell/shell.service';
import { MapComponent } from './map/map.component';
import { AuthGuard } from './helpers/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./newpost/newpost.module').then((m) => m.NewpostPageModule),
    canActivate: [AuthGuard],
  },
  ShellService.childRoutes([
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./dashboard/dashboard.module').then(
          (m) => m.DashboardPageModule
        ),
    },
    {
      path: 'business',
      loadChildren: () =>
        import('./business/business.module').then((m) => m.BusinessModule),
    },
    {
      path: 'feed',
      loadChildren: () =>
        import('./feed/feed.module').then((m) => m.FeedPageModule),
    },
    {
      path: 'profile',
      loadChildren: () =>
        import('./profile/profile.module').then((m) => m.ProfilePageModule),
    },
    {
      path: 'newpost',
      loadChildren: () =>
        import('./newpost/newpost.module').then((m) => m.NewpostPageModule),
    },
    {
      path: 'vouchers',
      loadChildren: () =>
        import('./vouchers/vouchers.module').then((m) => m.VouchersModule),
    },
    {
      path: 'settings',
      loadChildren: () =>
        import('./settings/settings.module').then((m) => m.SettingsPageModule),
    },
    // {
    //   path: 'landmines/:',
    //   component: LandmineComponent,
    // },
    {
      path: 'landmine/:id',
      component: LandmineComponent,
    },
    {
      path: 'map',
      component: MapComponent,
    },
    {
      path: 'settings',
      loadChildren: () =>
        import('./settings/settings.module').then((m) => m.SettingsPageModule),
    },
  ]),
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyPageModule
      ),
  },
  {
    path: 'terms-of-service',
    loadChildren: () =>
      import('./terms-of-service/terms-of-service.module').then(
        (m) => m.TermsOfServicePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
