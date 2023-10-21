import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../helpers/services/authentication.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  activeIndex = 0;
  activePageTitle = 'Home';
  Pages = [
    {
      title: 'Home',
      url: '/feed',
      icon: 'home',
    },
    {
      title: 'Vouchers',
      url: '/vouchers',
      icon: 'albums',
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'gear',
    },
    // {
    //   title: 'Login',
    //   url: '/login',
    //   icon: 'person',
    // },
    {
      title: 'Register A Business',
      url: '/register/business',
      icon: 'person',
    },
    {
      title: 'My Business',
      url: '/business',
      icon: 'building',
    },
  ];
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}
