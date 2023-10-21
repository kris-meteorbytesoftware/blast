import { UserModel } from '../models/user.model';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../helpers/services/user.service';
import { AuthenticationService } from '../helpers/services/authentication.service';
import { ValidatePasswordFields } from '../shared/form-validators/password-strength.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  hide: boolean = true;
  cHide: boolean = true;
  register: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      username: new FormControl(
        '',
        [Validators.required, Validators.maxLength(12), Validators.minLength(4)]
        // this.uniqueUsername.bind(this)
      ),
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
        // this.uniqueEmail.bind(this)
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
        ValidatePasswordFields.passwordStrength,
      ]),
      cpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(150),
      ]),
      isBusiness: new FormControl(null),
      phone: new FormControl(null),
    },
    {
      validators: Validators.compose([
        ValidatePasswordFields.mustMatch('password', 'cpassword'),
      ]),
    }
  );
  user: UserModel = {} as UserModel;

  errorMessages = {
    firstName: [{ type: 'required', message: 'First name is required' }],
    lastName: [
      { type: 'required', message: 'Last name is required' },
      { type: 'unique', message: 'Email is already exists' },
    ],
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'unique', message: 'Username is already exists' },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Email needs to be a valid email' },
      { type: 'unique', message: 'Email is already exists' },
    ],
    password: [
      { type: 'required', message: 'Password is erquired.' },
      { type: 'minLength', message: 'Must be at least 8 characters!' },
      { type: 'hasNumber', message: 'Must be at least 1 number!' },
      { type: 'hasUpper', message: 'Must be at least 1 Capital Case!' },
      { type: 'hasLower', message: 'Must be at least 1 Lower Case!' },
      { type: 'hasSpecial', message: 'Must be at least 1 Special Character!' },
      { type: 'hasWhiteSpace', message: 'Password must not contain spaces!' },
    ],
    cpassword: [{ type: 'mustMatch', message: 'Password does nto match' }],
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthenticationService
  ) {}

  async onRegister() {
    if (this.register.valid) {
      console.log(this.register.value);
      this.user.firstName = this.firstName?.value;
      this.user.lastName = this.lastName?.value;
      this.user.email = this.email?.value;
      this.user.username = this.username?.value;

      const username = this.username?.value;
      const password = this.password?.value;
      const email = this.email?.value;
      const phone = this.phone?.value;
      this.userService.registerUser(this.user, password).subscribe({
        next: (res) => {
          console.log('success', res);
          if (this.isBusiness) {
            this.router.navigateByUrl('business');
          } else {
            this.router.navigateByUrl('/home');
          }
        },
        error: (err) => {
          console.log('error', err.message);
        },
      });
      // this.user.phone = this.phone.value;
      // this.userService
      //   .registerUser(this.user, this.password.value)
      //   .subscribe((data) => {
      //     if (!data.error) {
      //       this.auth.register(data.user);
      //       if (this.isBusiness) {
      //         this.router.navigateByUrl('/register-business');
      //       } else {
      //         this.router.navigateByUrl('/home');
      //       }
      //     }
      //   });
    }
  }

  get firstName() {
    return this.register?.get('firstName') as FormGroup;
  }

  get lastName() {
    return this.register?.get('lastName') as FormGroup;
  }

  get username() {
    return this.register?.get('username') as FormGroup;
  }

  get email() {
    return this.register?.get('email') as FormGroup;
  }

  get password() {
    return this.register?.get('password') as FormGroup;
  }

  get cpassword() {
    return this.register?.get('cpassword') as FormGroup;
  }

  get isBusiness() {
    return this.register?.get('isBusiness') as FormGroup;
  }

  get phone() {
    return this.register?.get('phone') as FormGroup;
  }

  ngOnInit(): void {
    this.password.markAllAsTouched();
  }

  uniqueEmail() {
    if (this.email?.hasError('required') || this.email?.hasError('email')) {
      return null;
    }
    return this.userService.checkEmail(this.email?.value).pipe(
      map((res) => {
        console.log(res);
        if (!res.unique) {
          res = { unique: false };
        } else {
          res = null;
        }
        return res;
      })
    );
  }

  uniqueUsername() {
    if (
      this.username?.hasError('required') ||
      this.username?.hasError('minlength')
    ) {
      return null;
    }
    console.log(this.username?.dirty);
    return this.userService.checkUsername(this.username?.value).pipe(
      map((res) => {
        if (!res.unique) {
          res = { unique: false };
        } else {
          res = null;
        }
        return res;
      })
    );
  }
}
