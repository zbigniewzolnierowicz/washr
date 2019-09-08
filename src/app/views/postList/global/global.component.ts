import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  posts: Observable<any>;

  constructor(private pS: PostsService) {}

  ngOnInit() {
    this.posts = this.pS.getAllPosts;
  }

}
