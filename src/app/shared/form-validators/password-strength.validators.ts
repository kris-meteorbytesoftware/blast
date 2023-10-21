import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidatePasswordFields {
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
    const password = control.value as string;
    const errors = {
      hasNumber: /\d/.test(password) ? false : true,
      hasUpper: /[A-Z]/.test(password) ? false : true,
      hasLower: /[a-z]/.test(password) ? false : true,
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password) ? false : true,
      hasWhiteSpace: /\s/g.test(password) ? true : false,
      minLength: password.length >= 8 ? false : true,
    };
    console.log(password, /\d/.test(password));
    console.log(errors);
    return errors;
  }
  static notGreaterThanZero(control: AbstractControl): ValidationErrors | null {
    if (Number(control.value.replaceAll(',', '')) > 0) {
      return null;
    } else {
      return { notGreaterThanZero: true };
    }
  }
}
