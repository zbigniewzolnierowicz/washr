import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostViewComponent implements OnInit {
  id: string;
  post$: Observable<Post>;

  constructor(private route: ActivatedRoute, private pS: PostsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.post$ = this.pS.getPost(this.id).pipe(
        map(post => {
          const id = post.id;
          const ref = post.ref;
          const data = post.data() as Post;
          return {
            id,
            ref,
            ...data
          };
        })
      );
    });
  }
}
