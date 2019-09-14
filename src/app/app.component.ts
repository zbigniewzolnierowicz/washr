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
  @ViewChild('form', { static: false }) form: ElementRef;
  title = 'washr';
  error: string;
  isLoggedIn: boolean;
  showAdult: boolean;
  post = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
    isNSFW: new FormControl(false),
    image: new FormControl(null)
  });
  progress: number = null;

  // tslint:disable-next-line: max-line-length
  constructor(private pS: PostsService, private upS: FileUploadService, public afAuth: AngularFireAuth, private router: Router, private nsfw: NsfwService) {}

  ngOnInit() {
    this.afAuth.user.subscribe(u => u ? this.isLoggedIn = true : this.isLoggedIn = false);
    this.nsfw.nsfwStatus.subscribe(nsfw => this.showAdult = nsfw);
  }

  toggleShowAdult() {
    this.nsfw.toggleNsfw();
  }

  closeError() {
    this.error = '';
  }

  logOut() {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['login']));
  }

  async onSubmit() {
    if (this.afAuth.auth.currentUser != null) {
      let uploader: { task: any; ref: any; };
      if (this.post.value.image != null) {
        uploader = this.upS.uploadImageForPost(this.post.value.image);
      }
      const post: Post = { // Object to be posted as a new post
        ...this.post.value,
        commentCount: 0,
        postedAt: new Date(), // Get the date right
        postedBy: this.afAuth.auth.currentUser.uid
      };
      if (this.post.value.image != null) {
        uploader.task.percentageChanges()
        .pipe(
          finalize(() => this.progress = null)
        )
        .subscribe(progress => this.progress = progress); // Get the percentage status of the image upload
        uploader.task.snapshotChanges().pipe(
        finalize(() => {
          uploader.ref.getDownloadURL().subscribe(url => { // Get the URL of the uploaded image
            post.image = url; // Append it to the object responsible for being uploaded
            this.pS.createPost(post) // Create a new post
              .catch(err => this.error = err);
          });
        })).subscribe();
      } else {
        this.pS.createPost(post) // Create a new post
          .catch(err => this.error = err);
      }
      this.form.nativeElement.reset();
    } else {
      this.error = 'You need to log in!';
    }
  }
}
