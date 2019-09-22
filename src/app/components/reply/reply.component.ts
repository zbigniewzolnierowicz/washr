import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { NsfwService } from 'src/app/services/nsfw.service';
import { PostsService } from 'src/app/services/posts.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  showNsfw: boolean;
  @Input() content: Comment;
  isEdit = false;
  postEdit = new FormGroup({
    content: new FormControl(null, Validators.required)
  });
  start = 0;
  end = 0;

  constructor(private nsfw: NsfwService, private pS: PostsService, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.nsfw.nsfwStatus.subscribe(nsfw => {
      if (nsfw === false) {
        this.content.isNSFW ? (this.showNsfw = false) : (this.showNsfw = true);
      } else {
        this.showNsfw = true;
      }
    });
    this.postEdit.setValue({
      content: this.content.content
    });
  }

  format(ev: Event, type: string) {
    ev.preventDefault();
    const text: string = this.postEdit.value.content || '';
    const startIndex = this.start;
    const endIndex = this.end - this.start;
    const newText = `${text.substr(0, startIndex) || ''}${type}${text.substr(startIndex, endIndex) ||
      ''}${type}${text.substr(this.end, 999) || ''}`;
    this.postEdit.setValue({
      ...this.postEdit.value,
      content: newText
    });
  }

  selectEvent(ev: any) {
    this.start = ev.target.selectionStart;
    this.end = ev.target.selectionEnd;
  }

  insertHoriRule(ev: Event) {
    ev.preventDefault();
    const text: string = this.postEdit.value.content || '';
    const newText = text + '\n\n---';
    this.postEdit.setValue({
      ...this.postEdit.value,
      content: newText
    });
  }

  toggleIsEdit() {
    this.isEdit = !this.isEdit;
  }

  onSubmitEdit() {
    this.pS.edit(this.content, this.postEdit.value.content).catch(err => console.log(err));
  }

  get userUID() {
    return this.afAuth.auth.currentUser.uid;
  }

  deleteComment() {
    this.pS.delete(this.content); // .then(() => console.log('Comment deleted.'));
  }
}
