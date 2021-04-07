import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  signInError: string;
  isPasswordVisible = false;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  handleSignIn(): void {
    this.signInError = null;
    const formValue: Record<string, string> = this.signInFormGroup.value;
    this.auth
      .signIn(formValue.email, formValue.password)
      .catch((err: firebase.auth.AuthError) => {
        this.handleError(err);
      });
  }

  handleError(err: firebase.auth.Error): void {
    console.log(err);

    if (['auth/wrong-password', 'auth/user-not-found'].includes(err.code)) {
      this.signInError = 'Nesprávny e-mail alebo heslo.';
    } else if (err) {
      this.signInError =
        'Nastala chyba pri prihlasovaní. Vyskúšajte sa prihlásiť znovu.';
    }
  }

  getEmailError(): string | null {
    const formControl = this.signInFormGroup.get('email');

    if (formControl.hasError('required')) {
      return 'E-mailová adresa je povinná.';
    } else if (formControl.hasError('email')) {
      return 'E-mail má nesprávny formát.';
    }
    return null;
  }

  getPasswordError(): string | null {
    const formControl = this.signInFormGroup.get('password');

    if (formControl.hasError('required')) {
      return 'Heslo je povinné.';
    }
    return null;
  }
}
