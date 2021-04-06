import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.userData$ = afAuth.authState;
  }

  /* Sign up */
  signUp(email: string, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('You are Successfully signed up!', res);
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  signIn(email: string, password: string): void {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("You're in!");
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  /* Sign out */
  signOut(): void {
    this.afAuth.signOut();
  }
}
