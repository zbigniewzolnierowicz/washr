import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { NsfwService } from 'src/app/services/nsfw.service';
import { PostsService } from 'src/app/services/posts.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  showNsfw: boolean;
  @Input() content: Comment;

  constructor(private nsfw: NsfwService, private pS: PostsService, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.nsfw.nsfwStatus.subscribe(nsfw => {
      if (nsfw === false) {
        this.content.isNSFW ? this.showNsfw = false : this.showNsfw = true;
      } else {
        this.showNsfw = true;
      }
    });
  }

  get userUID() {
    return this.afAuth.auth.currentUser.uid;
  }

  deleteComment() {
    this.pS.delete(this.content); // .then(() => console.log('Comment deleted.'));
  }

}
