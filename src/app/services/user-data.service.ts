import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, flatMap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  changeBio(bio: string) {
    const userID = this.afAuth.auth.currentUser.uid;
    return this.db
      .collection('users')
      .doc(userID)
      .update({ bio });
  }

  loggedInUserData() {
    return this.afAuth.user.pipe(
      flatMap(result => {
        return this.db
          .collection('users')
          .doc<User>(result.uid)
          .get()
          .pipe(
            map(user => {
              const userData = user.data();
              return {
                uid: user.id,
                ...userData
              } as User;
            })
          );
      })
    );
  }

  getUserData(userID: string) {
    return this.db
      .collection('users')
      .doc(userID)
      .get()
      .pipe(map(user => user.data()));
  }
}
