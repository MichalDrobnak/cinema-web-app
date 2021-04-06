import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginError: string;

  signInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  handleSignIn(): void {
    this.loginError = null;
    const formValue: Record<string, string> = this.signInFormGroup.value;
    this.auth
      .signIn(formValue.email, formValue.password)
      .catch((err: Error) => {
        this.loginError = err.message;
        console.log('loggin error', this.loginError);
      });
  }
}
