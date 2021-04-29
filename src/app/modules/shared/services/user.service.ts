import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../authentication/services/auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}

  addCredit(credit: number): Observable<any> {
    return this.authService.userData$.pipe(
      first(),
      mergeMap((userData: User) => {
        return from(
          this.afs
            .collection('users')
            .doc(userData.uid)
            .update({ credit: userData.credit + credit })
        );
      })
    );
  }
}
