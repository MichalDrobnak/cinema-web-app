import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class AuthenticationModule {}
