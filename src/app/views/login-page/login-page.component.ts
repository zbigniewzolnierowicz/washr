import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(private afAuth: AngularFireAuth, private router: Router) { }
  login() {
    this.afAuth.auth.signInWithPopup(this.googleProvider).then(() => this.router.navigate(['']));
  }
  ngOnInit() {
  }

}
