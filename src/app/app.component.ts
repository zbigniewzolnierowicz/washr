import { Component, OnInit } from '@angular/core';
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
  title = 'washr';
  post = new FormGroup({
    title: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });
  image: File;
  imageURL: string;

  posts: Observable<any>;

  constructor(private pS: PostsService, private upS: FileUploadService) {}

  ngOnInit() {
    this.posts = this.pS.getAllPosts;
  }

  handleFile(event) {
    this.image = event;
    console.log(this.image.type);
  }

  onSubmit() {
    const uploader = this.upS.uploadImageForPost(this.image);
    const post: Post = {
      ...this.post.value
    };
    uploader.task.percentageChanges().subscribe(progress => console.log(progress));
    uploader.task.snapshotChanges().pipe(
      finalize(() => {
        uploader.ref.getDownloadURL().subscribe(url => {
          post.image = url;
          this.pS.createPost(post)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        });
      })
    ).subscribe();
  }

}
