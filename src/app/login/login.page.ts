import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

  login() {
    // Implement your login logic here
    this.router.navigate(['/dashboard']);
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
