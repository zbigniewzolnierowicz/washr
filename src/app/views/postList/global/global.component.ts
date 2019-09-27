import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {
  posts: Observable<any>;
  @ViewChild('form', { static: false }) form: ElementRef;
  post = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
    isNSFW: new FormControl(false),
    image: new FormControl(null)
  });
  progress: number = null;
  error: string;
  start: number;
  end: number;

  constructor(private pS: PostsService, private afAuth: AngularFireAuth, private upS: FileUploadService) {}

  format(ev: Event, type: string) {
    ev.preventDefault();
    const text: string = this.post.value.content || '';
    const startIndex = this.start;
    const endIndex = this.end - this.start;
    const newText = `${text.substr(0, startIndex) || ''}${type}${text.substr(startIndex, endIndex) ||
      ''}${type}${text.substr(this.end, 999) || ''}`;
    this.post.setValue({
      ...this.post.value,
      content: newText
    });
  }

  insertHoriRule(ev: Event) {
    ev.preventDefault();
    const text: string = this.post.value.content || '';
    const newText = text + '\n\n---';
    this.post.setValue({
      ...this.post.value,
      content: newText
    });
  }

  ngOnInit() {
    this.posts = this.pS.getAllPosts;
  }

  closeError() {
    this.error = '';
  }

  selectEvent(ev: any) {
    this.start = ev.target.selectionStart;
    this.end = ev.target.selectionEnd;
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
        postedAt: new Date(), // Get the date right
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
