import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import firebase from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z1-9]*'),
      this.strongPaswordValidator(),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z1-9_-]*'),
    ]),
  });

  isPasswordVisible = false;
  signUpError: string;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  handleSignUp(): void {
    const formValue: Record<string, string> = this.signUpFormGroup.value;
    const { email, password, username } = formValue;

    this.auth
      .signUp(email, password, username)
      .catch((err: firebase.auth.Error) => {
        this.handleError(err);
      });
  }

  handleError(err: firebase.auth.Error): void {
    if (err.code === 'auth/email-already-in-use') {
      this.signUpError = 'E-mail je už priradený k inému účtu.';
    } else if (err) {
      this.signUpError = 'Nastala chyba pri registrácii.';
    }
  }

  getEmailError(): string | null {
    const formControl = this.signUpFormGroup.get('email');

    if (formControl.hasError('required')) {
      return 'E-mailová adresa je povinná.';
    } else if (formControl.hasError('email')) {
      return 'E-mail má nesprávny formát.';
    }
    return null;
  }

  getUsernameError(): string | null {
    const formControl = this.signUpFormGroup.get('username');

    if (formControl.hasError('required')) {
      return 'Používateľské meno je povinné.';
    } else if (formControl.hasError('maxlength')) {
      return 'Maximálna povolená dĺžka je 20 znakov.';
    } else if (formControl.hasError('minlength')) {
      return 'Minimálna povolená dĺžka sú 3 znaky.';
    } else if (formControl.hasError('pattern')) {
      return 'Meno smie obsahovať len písmená, čísla a znaky "_", "-".';
    }
    return null;
  }

  getPasswordError(): string | null {
    const formControl = this.signUpFormGroup.get('password');

    if (formControl.hasError('required')) {
      return 'Heslo je povinné.';
    } else if (formControl.hasError('maxlength')) {
      return 'Maximálna povolená dĺžka je 20 znakov.';
    } else if (formControl.hasError('minlength')) {
      return 'Minimálna povolená dĺžka je 6 znakov.';
    } else if (formControl.hasError('pattern')) {
      return 'Heslo smie obsahovať len písmená a čísla.';
    } else if (formControl.hasError('strongPassword')) {
      return 'Heslo musí obsahovať veľké a malé písmeno a číslo.';
    }
    return null;
  }

  strongPaswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regExp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).*$/gm;
      const correct = regExp.test(control.value);
      return correct ? null : { strongPassword: { value: control.value } };
    };
  }
}
