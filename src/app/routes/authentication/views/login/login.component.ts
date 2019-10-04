import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  googleProvider = new auth.GoogleAuthProvider();
  githubProvider = new auth.GithubAuthProvider();

  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  logInWithGoogle() {
    this.afAuth.auth.signInWithPopup(this.googleProvider).then(() => this.router.navigate(['posts']));
  }
  logInWithGithub() {
    this.afAuth.auth.signInWithPopup(this.githubProvider).then(() => this.router.navigate(['posts']));
  }
  logInWithSomethingElse() {
    alert('Not implemented yet!');
  }
  ngOnInit() {}
}
