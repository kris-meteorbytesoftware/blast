import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class ValidateFields {
  static mustMatch(
    controlName: string,
    confirmControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue: string | null = control.get(controlName)?.value;
      const confirmControlValue: string | null =
        control.get(confirmControlName)?.value;

      if (controlValue !== confirmControlValue) {
        control.get(confirmControlName)?.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        control.get(confirmControlName)?.setErrors(null);
        return null;
      }
    };
  }

  static passwordStrength(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const errors = {
      hasNumber: false,
      hasUpper: false,
      hasLower: false,
      hasSpecial: false,
      hasWhiteSpace: false,
      minLength: false,
    };

    const hasNumber = /\d/.test(password?.value);
    if (!hasNumber) {
      errors['hasNumber'] = true;
    }
    const hasUpper = /[A-Z]/.test(password?.value);
    if (!hasUpper) {
      errors['hasUpper'] = true;
    }
    const hasLower = /[a-z]/.test(password?.value);
    if (!hasLower) {
      errors['hasLower'] = true;
    }
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password?.value);
    if (!hasSpecial) {
      errors['hasSpecial'] = true;
    }
    const hasWhiteSpace = /\s/g.test(password?.value);
    if (hasWhiteSpace && (password?.touched || password?.dirty)) {
      errors['hasWhiteSpace'] = true;
    }
    const minLength = password?.value.length >= 8 ? true : false;
    if (!minLength) {
      errors['minLength'] = true;
    }

    const valid =
      hasNumber &&
      hasUpper &&
      hasLower &&
      hasSpecial &&
      !hasWhiteSpace &&
      minLength;

    if (valid) {
      return null;
    } else {
      control.setErrors(errors);
      return errors;
    }
  }
  static notGreaterThanZero(control: AbstractControl): ValidationErrors | null {
    if (Number(control.value.replaceAll(',', '')) > 0) {
      return null;
    } else {
      return { notGreaterThanZero: true };
    }
  }
}
