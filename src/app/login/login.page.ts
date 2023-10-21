import { UserModel } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../helpers/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  myForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  error: boolean = false;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

  login() {
    // Implement your login logic here
    this.error = false;
    this.authService
      .login(this.username?.value, this.password?.value)
      .subscribe({
        next: (res) => {
          console.log('got a respone', res);
          let user = res as UserModel;
          this.authService.saveUser(user);
          this.router.navigate(['/feed']);
        },
        error: (err) => {
          console.log('got an error', err.message);
          this.error = true;
        },
      });
  }

  loginWithFacebook() {
    // Implement your Facebook login logic here
  }

  loginWithTwitter() {
    // Implement your Twitter login logic here
  }

  loginWithGoogle() {
    // Implement your Google login logic here
  }
}
