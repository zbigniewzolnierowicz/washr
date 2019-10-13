import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUser: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {}

  ngOnInit() {}

  submit() {
    this.afAuth.auth
      .createUserWithEmailAndPassword(this.registerUser.value.email, this.registerUser.value.password)
      .then(userData => {
        this.db
          .doc(`users/${userData.user.uid}`)
          .valueChanges()
          .subscribe(doc => {
            if (doc !== null) {
              this.router.navigate(['/profile']);
            }
          });
      })
      .catch(err => console.log(err));
  }
}
