import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  async loggedInUserData() {
    const userID = this.afAuth.auth.currentUser.uid;
    console.log(userID);
    return this.db.collection('users').doc(userID).get().pipe(map(user => user.data()));
  }

  getUserData(userID: string) {
    console.log(userID);
    return this.db.collection('users').doc(userID).get().pipe(map(user => user.data()));
  }
}
