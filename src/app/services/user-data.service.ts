import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { concatMap, distinctUntilChanged, finalize, map, skipWhile, take, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  updateUserData(data: { bio: string; displayName: string }) {
    const userID = this.afAuth.auth.currentUser.uid;
    return this.db
      .collection('users')
      .doc(userID)
      .update({ ...data });
  }

  loggedInUserData() {
    return this.afAuth.user.pipe(
      distinctUntilChanged(),
      skipWhile(user => user == null),
      take(1),
      finalize(() => console.log('Finalized!')),
      concatMap(user => {
        return this.db
          .collection('users')
          .doc<User>(user.uid)
          .get()
          .pipe(
            map(userDoc => userDoc.data()),
            skipWhile(userData => userData === null)
          );
      })
    );
  }

  getUserData(userID: string) {
    return this.db
      .collection('users')
      .doc(userID)
      .snapshotChanges()
      .pipe(
        map(user => user.payload.data()),
        skipWhile(userData => userData === null)
      );
  }
}
