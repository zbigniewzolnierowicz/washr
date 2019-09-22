import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  googleProvider = new auth.GoogleAuthProvider();
  githubProvider = new auth.GithubAuthProvider();

  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  logInWithGoogle() {
    this.afAuth.auth.signInWithPopup(this.googleProvider).then(() => this.router.navigate(['timeline']));
  }
  logInWithGithub() {
    this.afAuth.auth.signInWithPopup(this.githubProvider).then(() => this.router.navigate(['timeline']));
  }
  logInWithSomethingElse() {
    alert('Not implemented yet!');
  }
  ngOnInit() {}
}
