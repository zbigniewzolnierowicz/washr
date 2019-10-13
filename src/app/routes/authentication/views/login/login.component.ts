import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  googleProvider = new auth.GoogleAuthProvider();
  githubProvider = new auth.GithubAuthProvider();
  loginInfo = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  logInWithEmail() {
    const { email, password } = this.loginInfo.value;
    this.loginInfo.disable();
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => this.router.navigate(['posts']));
  }
  logInWithGoogle() {
    this.loginInfo.disable();
    this.afAuth.auth.signInWithPopup(this.googleProvider).then(() => this.router.navigate(['posts']));
  }
  logInWithGithub() {
    this.loginInfo.disable();
    this.afAuth.auth.signInWithPopup(this.githubProvider).then(() => this.router.navigate(['posts']));
  }
  logInWithSomethingElse() {
    alert('Not implemented yet!');
  }
  navigateToRegister() {
    this.router.navigate(['/auth', 'register']);
  }
  ngOnInit() {
    this.loginInfo.enable();
  }
}
