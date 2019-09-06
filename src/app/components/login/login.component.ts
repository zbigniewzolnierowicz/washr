import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  googleProvider = new auth.GoogleAuthProvider();

  constructor(public afAuth: AngularFireAuth) { }
  login() {
    this.afAuth.auth.signInWithPopup(this.googleProvider);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  ngOnInit() {
  }

}