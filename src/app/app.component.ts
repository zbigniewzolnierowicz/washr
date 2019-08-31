import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PostsService } from './services/posts.service';
import { FileUploadService } from './services/file-upload.service';
import { Post } from './interfaces/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('form', { static: false }) form: ElementRef;
  title = 'washr';
  post = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
    isNSFW: new FormControl(false),
    image: new FormControl(null)
  });

  posts: Observable<any>;

  constructor(private pS: PostsService, private upS: FileUploadService) {}

  ngOnInit() {
    this.posts = this.pS.getAllPosts;
  }

  onSubmit() {
    const uploader = this.upS.uploadImageForPost(this.post.value.image);
    const post: Post = { // Object to be posted as a new post
      ...this.post.value,
      postedAt: new Date(), // Get the date right
      postedBy: '00000000' // TODO: Replace with UID of the authenticated user
    };
    uploader.task.percentageChanges().subscribe(progress => console.log(progress));
    uploader.task.snapshotChanges().pipe(
      finalize(() => {
        uploader.ref.getDownloadURL().subscribe(url => {
          post.image = url;
          this.pS.createPost(post)
            .then(() => {
              this.form.nativeElement.reset();
            })
            .catch(err => console.log(err)); // TODO: handle errors in a less dev-y way
        });
      })
    ).subscribe();
  }


  reset() {
    this.form.nativeElement.reset();
  }

}
