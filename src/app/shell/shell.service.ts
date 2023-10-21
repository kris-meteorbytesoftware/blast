import { Routes, Route } from '@angular/router';
import { AuthGuard } from '../helpers/guards/auth.guard';
import { ShellComponent } from './shell.component';

export class ShellService {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthGuard],
    };
  }
}
