import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { concatMap, distinctUntilChanged, map, skipWhile, take } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  updateUserData(data: Partial<User>): Promise<void> {
    const userID = this.afAuth.auth.currentUser.uid;
    return this.db
      .collection<User[]>('users')
      .doc<User>(userID)
      .update({ ...data });
  }

  loggedInUserData(): Observable<User> {
    return this.afAuth.user.pipe(
      distinctUntilChanged(),
      skipWhile(user => user == null),
      take(1),
      concatMap(user => {
        return this.db
          .collection<User[]>('users')
          .doc<User>(user.uid)
          .get()
          .pipe(
            map(userDoc => userDoc.data() as User),
            skipWhile(userData => userData === null)
          );
      })
    );
  }

  getUserData(userID: string): Observable<User> {
    return this.db
      .collection<User[]>('users')
      .doc<User>(userID)
      .snapshotChanges()
      .pipe(
        map(user => user.payload.data() as User),
        skipWhile(userData => userData === null)
      );
  }
}
