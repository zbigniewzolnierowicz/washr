import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from './interfaces/post';
import { Observable } from 'rxjs';
import { PostsService } from './services/posts.service';

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

  posts: Observable<any>;

  constructor(private pS: PostsService) {}

  ngOnInit() {
    this.posts = this.pS.getAllPosts;
  }

  handleFile(event) {
    this.image = event;
  }

  onSubmit() {
    const newPost: Post = {
      ...this.post.value, // Get information from the form
      postedBy: '000000', // TODO: replace this with the UID of the authenticated user
      postedAt: new Date() // Current date
    };
    this.pS.createPost(newPost)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

}
