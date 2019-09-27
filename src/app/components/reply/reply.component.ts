import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { NsfwService } from 'src/app/services/nsfw.service';
import { PostsService } from 'src/app/services/posts.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

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
  thumb: string;
  img: string;
  fileMetadata: any;

  constructor(
    private nsfw: NsfwService,
    private pS: PostsService,
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage
  ) {}

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
    if (this.content.image) {
      const imageRef = this.afStorage.ref(this.content.image);
      let thumbRef: AngularFireStorageReference;
      imageRef.getMetadata().subscribe(metadata => {
        this.fileMetadata = metadata;
        thumbRef = this.afStorage.ref(`posts/${this.fileMetadata.name.replace(/(\.[\w\d_-]+)$/i, '_200x200$1')}`);
        thumbRef.getDownloadURL().subscribe(img => (this.thumb = img));
        imageRef.getDownloadURL().subscribe(img => (this.img = img));
      });
    }
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
