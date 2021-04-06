import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  handleSignUp(e: Event): void {
    console.log(e);

    const formValue: Record<string, string> = this.signInFormGroup.value;
    this.auth.signUp(formValue.email, formValue.password);
  }
}
