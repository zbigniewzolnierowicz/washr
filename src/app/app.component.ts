import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { PostsService } from './services/posts.service';
import { FileUploadService } from './services/file-upload.service';
import { Post } from './interfaces/post';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NsfwService } from './services/nsfw.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'washr';
  error: string;
  isLoggedIn: boolean;
  showAdult: boolean;
  buttonsHidden = true;

  // tslint:disable-next-line: max-line-length
  constructor(public afAuth: AngularFireAuth, private router: Router, private nsfw: NsfwService) {}

  ngOnInit() {
    this.afAuth.user.subscribe(u => (u ? (this.isLoggedIn = true) : (this.isLoggedIn = false)));
    this.nsfw.nsfwStatus.subscribe(nsfw => (this.showAdult = nsfw));
  }

  hideButtons() {
    this.buttonsHidden = !this.buttonsHidden;
  }

  toggleShowAdult() {
    this.nsfw.toggleNsfw();
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['']));
  }

  moveToTimeline() {
    this.router.navigate(['timeline']);
  }

  moveToProfileEdit() {
    this.router.navigate(['profile']);
  }
  moveToCredits() {
    this.router.navigate(['about']);
  }
}
