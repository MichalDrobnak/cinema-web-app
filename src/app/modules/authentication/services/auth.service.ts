import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.userData$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .doc<User>(`users/${user.uid}`)
            .valueChanges({ idField: 'uid' });
        }
        return of(null);
      })
    );
  }

  /* Sign up */
  signUp(email: string, password: string, username: string): Promise<void> {
    const promise = this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.createUser(res.user.uid, username);
        this.signIn(email, password);
      });

    return promise;
  }

  /* Sign in */
  signIn(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    const promise = this.afAuth.signInWithEmailAndPassword(email, password);
    promise.then(() => {
      this.router.navigate(['/dashboard']);
    });
    return promise;
  }

  /* Sign out */
  signOut(): void {
    this.afAuth.signOut();
  }

  private createUser(uid: string, username: string): void {
    this.afs.collection('users').doc(uid).set({
      credit: 0,
      isAdmin: false,
      notifications: [],
      tickets: [],
      username,
    });
    this.router.navigate(['/dashboard']);
  }
}
