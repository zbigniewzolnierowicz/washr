import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { NsfwService } from 'src/app/services/nsfw.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  showNsfw: boolean;
  @Input() content: Comment;

  constructor(private nsfw: NsfwService) {}

  ngOnInit() {
    this.nsfw.nsfwStatus.subscribe(nsfw => {
      if (nsfw === false) {
        this.content.isNSFW ? this.showNsfw = false : this.showNsfw = true;
      } else {
        this.showNsfw = true;
      }
    });
  }

}
