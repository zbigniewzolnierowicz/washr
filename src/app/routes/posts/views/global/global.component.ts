import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { firestore } from 'firebase/app';
import { AngularFireStorageReference } from '@angular/fire/storage';
import Timestamp = firestore.Timestamp;

@Component({
  selector: 'app-view-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {
  posts$: Observable<any>;
  @ViewChild('form', { static: false }) form: ElementRef;
  post = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl('', Validators.required),
    isNSFW: new FormControl(false),
    image: new FormControl(null)
  });
  progress: number = null;
  error: string;
  start: number;
  end: number;
  placeholderPost: Post;

  constructor(private pS: PostsService, private afAuth: AngularFireAuth, private upS: FileUploadService) {}

  ngOnInit() {
    this.posts$ = this.pS.getAllPosts;
    this.placeholderPost = {
      id: '0',
      title: 'Loading...',
      content:
        // tslint:disable-next-line: max-line-length
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis distinctio, ea alias fugiat vel reprehenderit id nemo architecto mollitia, harum impedit eaque molestias commodi nisi! Sequi architecto modi ea blanditiis!',
      postedAt: new Timestamp(0, 0),
      postedBy: '0',
      userData: {
        userID: '0',
        userName: 'Placeholder',
        userPhoto: 'https://via.placeholder.com/256'
      },
      commentCount: 0
    };
  }

  closeError() {
    this.error = '';
  }

  async onSubmit() {
    if (this.afAuth.auth.currentUser != null) {
      let uploader: { task: any; ref: AngularFireStorageReference };
      if (this.post.value.image != null) {
        uploader = this.upS.uploadImageForPost(this.post.value.image);
      }
      const post: Post = {
        // Object to be posted as a new post
        ...this.post.value,
        commentCount: 0,
        postedAt: firestore.FieldValue.serverTimestamp(), // Get the date right
        postedBy: this.afAuth.auth.currentUser.uid
      };
      if (this.post.value.image != null) {
        uploader.task
          .percentageChanges()
          .pipe(finalize(() => (this.progress = null)))
          .subscribe((progress: number) => (this.progress = progress)); // Get the percentage status of the image upload
        uploader.task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              // uploader.ref.getDownloadURL().subscribe(url => {
              uploader.ref.getMetadata().subscribe(metadata => {
                // Get the URI of the uploaded image
                const url = metadata.fullPath;
                post.image = url; // Append it to the object responsible for being uploaded
                this.pS
                  .createPost(post) // Create a new post
                  .catch(err => (this.error = err));
              });
            })
          )
          .subscribe();
      } else {
        this.pS
          .createPost(post) // Create a new post
          .catch(err => (this.error = err));
      }
      this.form.nativeElement.reset();
    } else {
      this.error = 'You need to log in!';
    }
  }
}
